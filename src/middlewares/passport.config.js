const passport = require('passport');
const { Strategy: JWTStrategy } = require('passport-jwt');
const config = require('../config/config.server');

const jwtSecret = config.jwtSecret;

passport.use(
  new JWTStrategy(
    {
      secretOrKey: jwtSecret,
      jwtFromRequest: req => {
        const authHeader = req.headers.authorization;
        let token 

        if(!authHeader) return null;

        
        
        const authHeaderContentBearer = authHeader.split(' ')[0] === 'Bearer'	;

        if (authHeaderContentBearer) {
          token = authHeader.split(' ')[1];
       
          
          return token;
        }
         
          return authHeader;
        

       
       
      }
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
