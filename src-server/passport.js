const passportService = require('./passport')
const passport = require('passport')
const User = require('./users/model')
const config = require('./config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')




const localLogin = new LocalStrategy({}, function(username, password, done) {
  User.findOne({ username }, function(err, user) {
    if (err) { return done(err) }
    if (!user) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }) }

    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err) }
      if (!isMatch) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }) }

      return done(null, user)
    })
  })
}

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: config.secret
}

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  console.log(payload)
  User.findById(payload._id, function(err, user) {
    if (err) { return done(err, false) }

    if (user) {
      done(null, user)
    }
    else {
      done(null, false)
    }
  })
})

passport.use(jwtLogin)
passport.use(localLogin)

const requireAuth = passport.authenticate('jwt')
const requireLogin = passport.authenticate('login')

const ROLE_ADMIN = 'Admin'
const ROLE_MEMBER = 'Member'

