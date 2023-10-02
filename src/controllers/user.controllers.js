const {User} = require('../models/user');

class UserController{


    createUser = (req, res) => {
        
        const {name, cpf, dt_birth, email, telephone, password, address_id, type_user} = req.body;
        User.create({
            name,
            cpf,
            dt_birth,
            email,
            telephone,
            password,
            address_id,
            type_user
        }).then((user) => {
            res.status(200).json(user);
        }).catch((error) => {
            res.status(500).json(error);
        });
        
        
    }

    //me de um json de cadastro teste.
 

  



    

}

const userController = new UserController();

module.exports = userController;