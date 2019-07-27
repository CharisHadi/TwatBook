// initialize authentication
var passport = require('passport');
var bcrypt = require('bcrypt');
var LocalStrategy = require('passport-local').Strategy;

var authenticationMiddleware = require('./middleware');

// generate password
var saltRounds = 10;
var myPlaintextPassword = 'password';
var salt = bcrypt.genSaltSync(saltRounds);
var passwordHash = bcrypt.hashSync(myPlaintextPassword, salt);

// test user password hashing
var user = {
  username: 'test-user',
  passwordHash,
  id: 1
};

// find user by username
function findUser (username, callback) {
  if (username === user.username) {
    return callback(null, user)
  }
  return callback(null)
};

// serialize user
passport.serializeUser(function (user, cb) {
  cb(null, user.username)
});

// deserialize user
passport.deserializeUser(function (username, cb) {
  findUser(username, cb)
});

// match username and password
function initPassport () {
  passport.use(new LocalStrategy(
    (username, password, done) => {
      findUser(username, (err, user) => {
        if (err) {
          return done(err)
        }

        // user not found
        if (!user) {
          console.log('User not found')
          return done(null, false)
        }

        // always use hashed passwords
        bcrypt.compare(password, user.passwordHash, (err, isValid) => {
          if (err) {
            return done(err)
          }
          if (!isValid) {
            return done(null, false)
          }
          return done(null, user)
        })
      })
    }
  ))

  passport.authenticationMiddleware = authenticationMiddleware;
};

module.exports = initPassport;