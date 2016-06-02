var express = require('express');
var path = require('path');
var webpack = require('webpack');
var app = express();
var compress = require('compression');
app.use(compress());

var isDevelopment = (process.env.NODE_ENV !== 'production')
var static_path = path.join(__dirname, 'dist');

app.use(express.static(static_path))
  .get('/', function (req, res) {
    res.sendFile('index.html', {
      root: static_path
    });
  }).listen(process.env.PORT || 8000, function (err) {
    if (err) {console.log(err) };
    console.log('Listening at localhost:8000');
  });

if (isDevelopment) {
  var config = require('./webpack.config');
  var WebpackDevServer = require('webpack-dev-server');

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true
  }).listen(3000, 'localhost', function (err, result) {
    if (err) { console.log(err) }
    console.log('Listening at localhost:3000');
  });
}
