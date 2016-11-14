const webpack = require('webpack');
const path = require('path')

module.exports = {
  devtool: 'source-maps',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    'whatwg-fetch',
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, './dist/public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
        inclue: path.join(__dirname, 'src')
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'url'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer:  {
    contentBase: 'dist/public',
    stats: 'minimal',
    hot: true,
    proxy: {
      '/api/*': 'http://localhost:1337'
    }
  },
}
