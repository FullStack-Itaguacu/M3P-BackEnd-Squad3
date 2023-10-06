const ERROR_MESSAGES = require("../constants/errorMessages");
const { HTTP_STATUS } = require("../constants/httpStatus");


function acessControl(roles) {

    return (req, res, next) => {
  
      if (roles.includes(req.user.role)) {
        next();
      } else {
        res.status(HTTP_STATUS.UNAUTHORIZED).json(ERROR_MESSAGES.UNAUTHORIZED);
      }
    
    }
  
  }

module.exports = acessControl;