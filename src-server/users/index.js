const passport = require('passport')

const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const User = require('./model')
const config = require('../config')
const passportService = require('../passport')

const seconds = 60
const minutes = 60
const hours = 3

function generateToken(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: seconds * minutes * hours  //seconds
  })
}

function setUserInfo(user) {
  const { _id, username, email, role } = user
  return { _id, username, email, role }
}



const requireAuth = passport.authenticate('jwt')
const requireLogin = passport.authenticate('login')

module.exports = function(app) {
  app.get('/session', checkSession)
  app.post('/session', requireLogin, /*sessionMiddleware,*/ createSession)
  app.delete('/session', deleteSession)

  app.get('/users', getUsers)
  app.get('/users/:userId', getUser)
  app.post('/users', createUser)
  app.put('/users/:userId', editUser)
  app.delete('/users/:userId', deleteUser)
}

function checkSession(req, res, next) {
  const sessionCookie = req && req.cookies && req.cookies.sessionId
  res.send('checkSession to be implemented\n')
  return null
}

function createSession(req, res, next) {
  console.log(req.body)
  const { username, password, email, _id, role } = req.body
  const user = { username, password, email, _id, role }
  const userInfo = setUserInfo(user)

  res.status(200).json({
    token: 'JWT ' + generateToken(userInfo),
    user: userInfo
  })
}

function deleteSession(req, res, next) {
  const sessionCookie = req.cookies.sessionId
  const cookieParts = sessionCookie.split(':')
  res.send('deleteSession to be implemented\n')
  return null
}

function getUsers(req, res, next) {
  res.send('getUsers to be implemented\n')
  return null
}

function getUser(req, res, next) {
  res.send('getUser to be implemented\n')
  return null
}

function createUser(req, res, next) {
  const { email, username, password } = req.body //email optional, but password reset won't be an option

  if (!username) {
    return res.status(422).send({ error: 'You must enter a username.' })
  }

  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' })
  }

  User.findOne({ username }, function(err, existingUser) {
    if (err) { return next(err) }

    if (existingUser) {
      return res.status(422).send({ error: 'That email address is already in use.' })
    }

    const userDetails = { username, password }
    if (email) { userDetails.email = email }
    const user = new User(userDetails)

    user.save(function(err, user) {
      if (err) { return next(err) }

      //can have email callbacks if succeeded

      const userInfo = setUserInfo(user)

      res.status(201).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
      })
    })
  })
}

function editUser(req, res, next) {
  res.send('editUser to be implemented\n')
  return null
}

function deleteUser(req, res, next) {
  res.send('deleteUser to be implemented\n')
  return null
}


function sessionMiddleware(err, req, res, next) {
	const cookie = req && req.cookies && req.cookies.session
	const {username, password, email, requestType} = req.body
}

const loginCallback = (err, cursor, serverStuff) => {
  const {req, res, next} = serverStuff
  const {username, password, requestType} = req.body
  if (err) throw err
}

function checkRole(role) {
  return function(req, res, next) {
    const user = req.user

    User.findbyId(user._id, function(err, foundUser) {
      if (err) {
        res.status(422).json({ error: 'No user was found.' })
        return next(err)
      }

      if (foundUser.role === role) {
        return next()
      }

      res.status(401).json({ error: 'You are not authorized to view this content.' })
      return next('Unauthorized')
    })
  }
}
