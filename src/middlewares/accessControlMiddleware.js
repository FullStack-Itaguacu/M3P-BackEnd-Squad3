const ERROR_MESSAGES = require("../constants/errorMessages");
const { HTTP_STATUS } = require("../constants/httpStatus");


function acessControl(roles) {

  return (req, res, next) => {

    
    const userRole = req.user.role || req.user.typeUser

    
    if(!roles.includes(userRole)) {
      return res.status(HTTP_STATUS.FORBIDDEN).json(ERROR_MESSAGES.FORBIDDEN);
    }

    
    next();

  }
  
  }

module.exports = acessControl;