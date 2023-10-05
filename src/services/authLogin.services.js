const {User} = require('../models/user');
const passwordHasher = require('../utils/passwordHasher');

class AuthLoginService {

    async findUserByEmail(email) {
        // busca o usuário pelo email

        const user = await User.findOne({where: {email: email}});
        if (!user) {
            return null;
        }
        return user;


    }
  
    async validatePassword(password, user) {
        
        const passwordMatch = await passwordHasher.comparePassword(
            password,
            user.password
        );
    
        if (!passwordMatch) {
            return null;
        }
        return user;
    }
  
  }
  
  const authLoginService = new AuthLoginService();

    module.exports = authLoginService;