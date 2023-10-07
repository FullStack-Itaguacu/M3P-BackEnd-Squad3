

const ERROR_MESSAGES = require('../constants/errorMessages');
const { HTTP_STATUS } = require('../constants/httpStatus');
const authLoginServices = require('../services/authLogin.services');

async function authMiddleware(req, res, next) {

  try {

    const { email, password } = req.body;
   
    if(!email || !password) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(ERROR_MESSAGES.BAD_REQUEST);
    }

    const user = await authLoginServices.findUserByEmail(email);

    if(!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json(ERROR_MESSAGES.UNAUTHORIZED);
    }

    const isValid = await authLoginServices.validatePassword(password, user);

    if(!isValid) {
      return res.status(HTTP_STATUS).json(ERROR_MESSAGES.UNAUTHORIZED);
    }

    req.user= user.dataValues; //disponibiliza usuário para próximas middlewares

    next();

  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ERROR_MESSAGES.INTERNAL_SERVER_ERROR); 
  }

}

module.exports = authMiddleware;