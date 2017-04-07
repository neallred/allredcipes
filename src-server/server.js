const bcrypt = require('bcrypt')

//example cookie:
//{ sessionId: 'username:ff:sessionId:$2a$10$Q8FNLyHN0ztlcTKxMRX1.uBligrQYQa53wK3LKt1A2WaP8vD3BM8K' }

const express = require('express')
const path = require('path')
const compress = require('compression')
const bodyParser = require('body-parser') 
const cookieParser = require('cookie-parser')

const isDevelopment = (process.env.NODE_ENV !== 'production')
const static_path = path.join(__dirname, '../dist')

const saltRounds = 10

const sessionsTable = {
}

const app = express()

app.use(express.static(static_path))
	.get('/', function (req, res) {
		res.sendFile('index.html', {
			root: static_path
		})
	}).listen(process.env.PORT || 8000, function (err) {
		if (err) {console.log(err) }
		console.log('Listening at localhost:8000')
	})

//middlewares
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(compress())
//app.use is global? And to use middleware just on one endpoint, just apply it as an argument there?


	
//GET RECIPES ENDPOINT
app.get('/recipes', function getRecipes(req, res, next) {
})

//CREATE RECIPE ENDPOINT
app.post('/recipes', isLoggedIn, function createRecipe(req, res, next) {
	const { body = {}, params = {} } = req
	const { name, ingredients, instructions, author } = body
	const { id } = params

	if (!name || !name.trim()) {
		return res.send('Unable to create recipe, no recipe name was supplied')
	}

	const insertObject = {}
	insertObject.hideIngredients = true
	if (name) { insertObject.name = name}
	if (ingredients) { insertObject.ingredients = ingredients}
	if (instructions) { insertObject.instructions = instructions}
	if (author) { insertObject.author = author}

  //c((conn) => {
	//	r.table('recipes').insert(insertObject)
	//		.run(conn, function(err, result) {
	//			if (err) { throw err }
	//			const newId = result && result.generated_keys && result.generated_keys[0]
	//			console.log(newId)
	//			r.table('recipes').get(newId).run(conn, function(err, resultFetch) {
	//				if (err) { throw err }
	//				console.log('new recipe:')
	//				console.log(JSON.stringify(resultFetch))
	//				const newRecipe = Object.assign({}, resultFetch, {id: newId})
	//				return res.send(JSON.stringify(newRecipe))
	//			})
	//		})
	//})
})

//UPDATE RECIPE
app.put('/recipes/:id', isLoggedIn, function updateRecipe(req, res, next) {
	const { body = {}, params = {} } = req
	const {id} = params
	const { name, ingredients, instructions, author } = body
	const requestLogTemplate = `User tried to update recipe of id ${id} with
name: ${name},
ingredients: ${ingredients},
instructions: ${instructions},
author: ${author}
`

	console.log(requestLogTemplate)
	const updateObject = {}
	if (name) { updateObject.name = name}
	if (ingredients) { updateObject.ingredients = ingredients}
	if (instructions) { updateObject.instructions = instructions}
	if (author) { updateObject.author = author}
	
	c((conn) => {
		r.table('recipes').get(id).update(updateObject)
			.run(conn, function(err, result) {
				if (err) { throw err }
				console.log(result)
				r.table('recipes').get(id).run(conn, function(err, resultFetch) {
					if (err) { throw err }
					console.log(JSON.stringify(resultFetch))
					return res.send(JSON.stringify(resultFetch))
				})
			})
	})
})

//DELETE RECIPE
app.delete('/recipes/:id', isLoggedIn, function deleteRecipe(req, res, next) {
	const { params = {} } = req
	const {id} = params
  //c((conn) => {
	//	r.table("recipes").get(id).delete()
	//		.run(conn, function(err, result) {
	//			if (err) { throw err }
	//			console.log(result)
	//			if (result.deleted) {
	//				return res.send({message: `You deleted recipe of id ${id}`, id})
	//			}
	//			else if (!result.deleted && result.skipped) {
	//				return res.send({message: `Unable to delete recipe of id ${id}`})
	//			}
	//		})
	//})

})

app.get('/session', function createSession(req, res, next) {
	const sessionCookie = req && req.cookies && req.cookies.sessionId
	if (!sessionCookie) {
		return res.send({message: 'No valid sessionId found with that username', isLoggedIn: false})
	}
	const cookieParts = sessionCookie.split(':')

	if(sessionsTable[cookieParts[1]] && cookieParts[3] === sessionsTable[cookieParts[1]]) {
		return res.send({message: 'Good job bubs, you already have a valid login!', isLoggedIn: true})
	}
})

app.post('/session', sessionMiddleware, function createSession(req, res, next) {
	const { username, password, email } = req.body

	bcrypt.hash(password, saltRounds, function(err, hash) {
		sessionsTable[username] = hash
		res.cookie('sessionId',`username:${username}:sessionId:${hash}`, { maxAge: (90 * 60 * 1000), httpOnly: true })
		res.send({message: 'Good job bubs, you got a valid login!', isLoggedIn: true})
	})
})

app.delete('/session', function deleteSession(req, res, next) {
	const sessionCookie = req.cookies.sessionId
	const cookieParts = sessionCookie.split(':')

	delete sessionsTable[cookieParts[1]]
	res.cookie('sessionId', '', { expires: new Date() })
	res.send({ message: 'You deleted your session cookie.', isLoggedIn: false })
})

const loginCallback = (err, cursor, serverStuff) => {
	const {req, res, next} = serverStuff
	const {username, password, requestType} = req.body
	if (err) throw err
	cursor.toArray(function(err, result) {
		if (err) throw err
		queriedUser = result[0]
		if (!queriedUser) {
			return res.send({message: 'Wrong username or password', isLoggedIn: false})
		}
		else if (queriedUser.password === password) {
			return next()
		}
		else {
			return res.send({message: 'Wrong username or password', isLoggedIn: false})
		}
	})
}

function sessionMiddleware(req, res, next) {
	const cookie = req && req.cookies && req.cookies.session
	const {username, password, email, requestType} = req.body
	console.log(username, password, email, requestType)
	const serverStuff = {req, res, next}

	let queriedUser = null

	if (requestType === 'login') {
    //		c((conn) => {
    //			r.table('users').filter(r.row('username').eq(username)).
    //				run(conn, function(err, cursor) {loginCallback(err, cursor, serverStuff)})
    //		})
	}
	else if (requestType === 'signup') {
    //		c((conn) => {
    //			r.table('users').filter(r.row('username').eq(username)).
    //				run(conn, function(err, cursor) {
    //					if (err) throw err
    //					cursor.toArray(function(err, usersWithRequestedUsername) {
    //						if (usersWithRequestedUsername.length) {
    //							console.log('USER ALREADY EXISTS', usersWithRequestedUsername)
    //							return res.send({message: 'User already exists, please pick a different name'}).end()
    //						}
    //						else {
    //							console.log('CREATING USER WITH', req.body)
    //							createUser(conn, res, req.body)
    //						}
    //					})
    //				})
    //		})
	}
	else {
		res.send({message: 'Unknown request type, nothing doing'}).end()
	}
}

const createUser = (conn, res, userData) => {
	//TODO: START HERE, FIND A WAY TO GENERATE A SALT BASED ON A RANDOM NUMBER AND A FIXED SALT
	//bcrypt.hash(password, saltRounds, function(err, hash) {
	//	sessionsTable[username] = hash
	//	res.cookie('sessionId',`username:${username}:sessionId:${hash}`, { maxAge: (90 * 60 * 1000), httpOnly: true })
	//	res.send({message: 'Good job bubs, you got a valid login!', isLoggedIn: true})
	//})
	const {username, password, email } = userData
  //	r.table('users').insert(userData)
  //		.run(conn, function(err, result) {
  //			if (err) { throw err }
  //			const newId = result && result.generated_keys && result.generated_keys[0]
  //			r.table('users').get(newId).run(conn, function(err, resultFetch) {
  //				if (err) { throw err }
  //				console.log('New user created:')
  //				console.log(JSON.stringify(resultFetch))
  //				const newUser = Object.assign({}, resultFetch, {id: newId})
  //				return res.send(JSON.stringify(newUser))
  //			})
  //		})
}

function isLoggedIn(req, res, next) {
	const sessionCookie = req.cookies && req.cookies.sessionId
	const cookieParts = sessionCookie.split(':')

	if(sessionsTable[cookieParts[1]] && cookieParts[3] === sessionsTable[cookieParts[1]]) {
		return next()
	}
	else {
		res.send('Nice try, bubs').end()
	}
}
