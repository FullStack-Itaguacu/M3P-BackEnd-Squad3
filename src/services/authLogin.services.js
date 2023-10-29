const { User } = require("../models/user");
const { emailValidator } = require("../utils/emailValidator");
const passwordHasher = require("../utils/passwordHasher");

class AuthLoginService {
  async findUserByEmail(email) {
  
    const formatEmail = email.toLowerCase();
    

    const isValidEmail = await emailValidator(formatEmail);
    if (!isValidEmail) {
      return null;
    }

    const user = await User.findOne({ where: { email: formatEmail } });
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
