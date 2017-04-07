const bcrypt = require('bcrypt')

const express = require('express')
const path = require('path')
const compress = require('compression')
const bodyParser = require('body-parser') 
const cookieParser = require('cookie-parser')

//const mongoose = require('mongoose')
//const databaseUrl = 'mongodb://localhost/learn'
//const database = mongoose.connect(databaseUrl)
//const isDevelopment = (process.env.NODE_ENV !== 'production')


const app = express()

const static_path = path.join(__dirname, '../dist')
app.use(express.static(static_path))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(compress())

app.listen(process.env.PORT || 8000, function (err) {
  if (err) {console.log(err) }
  console.log('Listening at localhost:8000')
})

//Order matters for route matching
require('./home/index')(app)
require('./recipes/index')(app)
require('./users/index')(app)
