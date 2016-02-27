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
			{ test: /\.less$/, loaders: [
				'style-loader',
				'css-loader',
				'less-loader?cleancss'
			]},
			{ test: /\.png$/, loader: 'url-loader?limit=100000&mimetype=image/png' },
			{ test: /\.woff2$/, loader: 'url-loader' }
		]
	}
};

module.exports = config;