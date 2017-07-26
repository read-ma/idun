import path from 'path';
import os from 'os';

// Build performance boosts
import aliases from './webpack.aliases.babel.js';
import plugins from './webpack.plugins.babel.js';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
const extractCSS = new ExtractTextPlugin('[name].[contenthash:5].css');

const BUILD_DIR = path.join(__dirname, 'dist');

module.exports = {
  entry: {
    bundle: './src/app/app.js',
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].[chunkhash:5].js',
    chunkFilename: '[name].[chunkhash:5].js'
  },
  devServer: {
    host: '0.0.0.0',
    port: '8080',
    contentBase: BUILD_DIR,
    publicPath: '/',
    watchContentBase: true,
    watchOptions: {
      ignored: /node_modules/
    }
  },
  externals: {
    airbrakeJs: 'airbrakeJs'
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        use: ['babel-loader?cacheDirectory'],
        exclude: /node_modules/
      },
      {
        test: /(\.css|\.scss|\.sass)$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src', 'assets', 'sass'),
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.(eot|woff|woff2|ttf|gif|png|jpg|svg)$/,
        use: 'url-loader?limit=10000&name=[name].[ext]'
      }
    ]
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), path.join(__dirname, 'node_modules')],
    extensions: ['.js', '.jsx', '.sass'],
    alias: aliases
  },
  plugins: plugins({ extractCSS, BUILD_DIR })
};
