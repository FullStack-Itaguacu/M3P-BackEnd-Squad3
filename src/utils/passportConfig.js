const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');  
const { sign } = require('jsonwebtoken');

const authService = require('../services/authLogin.services');

passport.use(new LocalStrategy({
  usernameField: 'email',
  session: false
}, async (email, password, done) => {

  try {

    const user = await authService.getUserByEmail(email);

    if (!user) {
      return done(null, false);
    }

    const isValid = await authService.validatePassword(password, user);

    if (!isValid) {
      return done(null, false);
    }

    done(null, user, { token: generateToken(user) });

  } catch (error) {
    done(error); 
  }

}));

function generateToken(user) {
  return sign({ sub: user.id }, 'secretkey');
}

module.exports = passport;