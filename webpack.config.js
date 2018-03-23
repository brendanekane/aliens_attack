var path = require('path');

module.exports = {
  entry: './js/aliens_attack.js',
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: './bundle.js'
  },

  module: {
    loaders: [
      {
      test: [/\.js?$/],
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: ['env']
      }
    }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js']
  }

};
