const passport = require('passport');
const { Strategy: JWTStrategy } = require('passport-jwt');
const config = require('../config/config.server');

const jwtSecret = config.jwtSecret;

passport.use(
  new JWTStrategy(
    {
      secretOrKey: jwtSecret,
      jwtFromRequest: req => req.headers.authorization?.split(' ')[1]  
    },

    async (token, done) => {
      try {
        const user = token;

        if (user) {
          done(null, user); 
        } else {
          done(null, false); 
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

module.exports = passport;
