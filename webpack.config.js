var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/scripts/main',
  output: {
    path: path.join(__dirname, 'dist/scripts'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
