const path = require('path');
const nodeModulesDir = path.resolve(__dirname, 'node_modules');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: path.resolve(__dirname, './src/app/app.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  externals: {
    Config: JSON.stringify({
      apiUrl: 'http://api.readma.com/api'
    })
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,

      // There is not need to run the loader through
      // vendors
      exclude: [nodeModulesDir],
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('css!sass')
    }, {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
      loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'ReadMa - Your learning assistant',
      template: './public/index.production.html',
      hash: true,
    }),
    new ExtractTextPlugin('style.css', {
      allChunks: true
    }),
    new CompressionPlugin({
      asset: '[path]',
      algorithm: 'zopfli',
      test: /\.js$|\.css$/
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
};

module.exports = config;
