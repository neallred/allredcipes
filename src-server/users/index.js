//example cookie:
//{ sessionId: 'username:ff:sessionId:$2a$10$Q8FNLyHN0ztlcTKxMRX1.uBligrQYQa53wK3LKt1A2WaP8vD3BM8K' }


module.exports = function(app) {
  app.get('/session', checkSession)
  app.post('/session', /*sessionMiddleware,*/ createSession)
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
  const { username, password, email } = req.body
  res.send('createSession to be implemented\n')
  return null
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
  res.send('createUser to be implemented\n')
  return null
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
