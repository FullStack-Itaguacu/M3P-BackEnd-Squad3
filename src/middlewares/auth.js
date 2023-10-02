const passport = require('./passport.config');
const {HTTP_STATUS} = require('../constants/httpStatus');
const {ERROR_MESSAGES} = require('../constants/errorMessages');

module.exports = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    if (error || !user) {

      return res.status(HTTP_STATUS.UNAUTHORIZED).json(ERROR_MESSAGES.UNAUTHORIZED);
    }

    req.user = user;

    next();
  })(req, res, next);
}