const { User} = require('../models/user');
const { Address} = require('../models/address');
const {relations} = require('../models/relationShips');

class UserController{


    createUser = (req, res) => {
        
        const { user, address } = req.body;
        const { street, numberStreet,neighborhood, city, state, country } = address;
        const { fullName, email, cpf,phone,password,birthDate,typeUser} = user;
        console.log(birthDate);
               const date = new Date(birthDate);
        console.log(date);
       try {
        User.create({
            fullName,
            email,
            cpf,
            phone,
            password,
            typeUser,
            birthData:new Date(birthDate),
        }).then((user) => {
            Address.create({
                street,
                numberStreet,
                neighborhood,
                city,
                state,
                country,
            }).then((address) => {
                relations.create({
                    userId: user.id,
                    addressId: address.id,
                }).then((relation) => {
                    res.status(201).json({ user, address, relation });
                });
            });
        });
        
       } catch (error) {
        
       }

        
    }

    //me de um json de cadastro teste.
 

  



    

}

const userController = new UserController();

module.exports = userController;