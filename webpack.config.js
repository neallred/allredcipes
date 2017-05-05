'use strict';
const webpack = require('webpack');
const path = require('path');

const PATHS = {
  src: path.join(__dirname, 'src-frontend')
};

const config = {
	context: __dirname,
	entry: {
		app: './src-frontend/index.js',
		js: ['babel-polyfill']
	},
	output: {
		libraryTarget: 'umd',
		path: path.join(__dirname, 'dist'),
		filename: '[name].js'
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.webpack.js', '.web.js', '.js', '.jsx'],
	},
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
  ],
	module: {
		rules: [
			{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.html$/, use: 'raw-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader?sourceMap'] },
			{ test: /\.png$/, use: 'url-loader?limit=100000&mimetype=image/png' },
			{ test: /\.jpeg$/, use: 'url-loader?limit=100000&mimetype=image/jpeg' },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, use: 'file-loader'},
		]
	}
};

module.exports = config;
