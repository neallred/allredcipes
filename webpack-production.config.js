var path = require('path');
var webpack = require('webpack');
var CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
  path: path.join(__dirname, 'dist'),
  filename: '[name].js',
  publicPath: 'dist/'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
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
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.jsx$/,
        loader: 'babel',
        include: path.join(__dirname, 'src') },
      { test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/ },
			{ test: /\.html$/, loader: 'raw', exclude: /node_modules/ },
      { test: /\.css$/, loaders: ['style', 'css'], exclude: /node_modules/ },
      { test: /\.scss$/, loader: 'style!css!sass?sourceMap', exclude: /node_modules/ },
			{ test: /\.png$/, loader: 'url-loader?limit=100000&mimetype=image/png', exclude: /node_modules/ },
			{ test: /\.jpeg$/, loader: 'url-loader?limit=100000&mimetype=image/jpeg', exclude: /node_modules/ },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader : 'file-loader', exclude: /node_modules/},
      { test: /\.pdf$/, loader: 'file-loader', exclude: /node_modules/},
			{ test: /\.woff2$/, loader: 'url-loader', exclude: /node_modules/ }
    ]
  }
}

