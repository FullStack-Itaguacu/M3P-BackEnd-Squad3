const { User} = require('../models/user');
const { Address} = require('../models/address');
const {relations} = require('../models/relationShips');

class UserController{


    createUser = async (req, res) => {
        
        const { user, address } = req.body;
        const { street, numberStreet,neighborhood, city, state, zip } = address[0];
        const { fullName, email, cpf,phone,password,birthDate,typeUser} = user;
 
       try {
        // const user = await User.create({
        //     fullName,
        //     email,
        //     cpf,
        //     phone,
        //     password,
        //     typeUser,
        //     birthDate:new Date(birthDate),
        // })
        
        const address = await Address.create({
            street,
            numberStreet :numberStreet,
            neighborhood,
            city,
            state,
            zip:Number(zip),
            latitude:0,
            longitude:0,
        })
        console.log(address);
        
       } catch (error) {
        console.log(error);
       }

        
    }

    //me de um json de cadastro teste.
 

  



    

}

const userController = new UserController();

module.exports = userController;