const express = require('express')
const path = require('path')
const compress = require('compression')
const bodyParser = require('body-parser') 
const cookieParser = require('cookie-parser')
const config = require('./config');

const mongoose = require('mongoose')
mongoose.Promise = require('bluebird');
mongoose.connect(config.databaseUrl)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to database');
});




//const isDevelopment = (process.env.NODE_ENV !== 'production')


const app = express()

const static_path = path.join(__dirname, '../dist')
app.use(express.static(static_path))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(compress())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.listen(config.port, function (err) {
  if (err) {console.log(err) }
  console.log('Listening at localhost:8000')
})

//Order matters for route matching
require('./home/index')(app)
require('./recipes/index')(app)
require('./users/index')(app)
