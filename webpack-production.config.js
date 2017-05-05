const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  devtool: 'source-map',
  entry: [
    './src-frontend/index'
  ],
  output: {
  path: path.join(__dirname, 'dist'),
  filename: '[name].js',
  publicPath: 'dist/'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
  ],
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [ { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/, include: path.join(__dirname, 'src-frontend') },
			{ test: /\.html$/, use: 'raw-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'], exclude: /node_modules/ },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader?sourceMap'], exclude: /node_modules/ },
			{ test: /\.png$/, loader: 'url-loader?limit=100000&mimetype=image/png', exclude: /node_modules/ },
			{ test: /\.jpeg$/, loader: 'url-loader?limit=100000&mimetype=image/jpeg', exclude: /node_modules/ },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader : 'file-loader', exclude: /node_modules/}
    ]
  }
}

