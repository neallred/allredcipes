'use strict';
var path = require('path');

var config = {
	context: __dirname,
	entry: { app: './src/index.jsx'},
	output: {
		libraryTarget: 'umd',
		path: path.join(__dirname, 'dist'),
		filename: '[name].js'
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
	},
	module: {
		loaders: [
			{ test: /\.js(x)?$/, loader: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.html$/, loader: 'raw' },
      { test: /\.css$/, loaders: ['style', 'css'] },
      { test: /\.scss$/, loader: 'style!css!sass?sourceMap' },
			{ test: /\.png$/, loader: 'url-loader?limit=100000&mimetype=image/png' },
			{ test: /\.jpeg$/, loader: 'url-loader?limit=100000&mimetype=image/jpeg' },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader : 'file-loader'},
			{ test: /\.woff2$/, loader: 'url-loader' }
		]
	}
};

module.exports = config;
