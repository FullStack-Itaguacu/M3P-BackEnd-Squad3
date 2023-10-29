

const ERROR_MESSAGES = require('../constants/errorMessages');
const { HTTP_STATUS } = require('../constants/httpStatus');
const authLoginServices = require('../services/authLogin.services');

async function authMiddleware(req, res, next) {

  try {

    const { email, password } = req.body;
    
   
    if(!email || !password) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(ERROR_MESSAGES.BAD_REQUEST_LOGIN);
    }

    const user = await authLoginServices.findUserByEmail(email);

    
    if(!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json(ERROR_MESSAGES.UNREGISTERED_USER);
    }

   

    const isValid = await authLoginServices.validatePassword(password, user);

    if(!isValid || isValid === null) {
      console.log('entrou aqui');
      return res.status(HTTP_STATUS.UNAUTHORIZED).json(ERROR_MESSAGES.UNAUTHORIZED_LOGIN);
    }
    

    req.user= user.dataValues; 

    next();

  } catch (error) {
    console.log(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ERROR_MESSAGES.INTERNAL_SERVER_ERROR); 
  }

}

module.exports = authMiddleware;