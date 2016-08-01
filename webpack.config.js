require('dotenv').config();
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBrowserPlugin = require('webpack-browser-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  // Read more about debugging: http://webpack.github.io/docs/configuration.html#devtool
  // devtool: 'inline-source-map',
  entry: {
    bundle: [
      'webpack/hot/dev-server',
      './src/app/app',
    ],
    vendor: [
      'react', 'redux', 'redux-thunk', 'react-dom', 'react-router', 'react-ga', 'react-router-redux',
      'react-addons-css-transition-group', 'lodash', 'moment', 'chart.js', 'material-ui',
      'classnames', 'history', 'axios', 'airbrake-js'
      // To include constants/d3k we need to extract it to its own npm module (it looks in node_modules)
    ],
  },
  output: {
    path: path.join(__dirname, '/public'),
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  devServer: {
    contentBase: './public',
    host: 'localhost',
    port: 8080
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|js)$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'url-loader?limit=20000&name=[name]-[hash].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ExtractTextPlugin('public/style.css', {
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        API_URL: `"${process.env.API_URL}"`,
        GA_ID: `"${process.env.GA_ID}"`,
        AIRBRAKE_PROJECTID: `"${process.env.AIRBRAKE_PROJECTID}"`,
        AIRBRAKE_URL: `"${process.env.AIRBRAKE_URL}"`,
      }
    }),
    new WebpackBrowserPlugin({
      browser: 'Chrome',
      port: 8080,
      url: 'http://localhost'
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new WebpackMd5Hash(),
    new ManifestPlugin(),
    new ChunkManifestPlugin({
      filename: 'manifest.json',
      manifestVariable: 'webpackManifest'
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),

    // ,
    // new BrowserSyncPlugin({
    //   // browse to http://localhost:3000/ during development,
    //   // ./public directory is being served
    //   host: 'localhost',
    //   port: 3000,
    //   proxy: 'http://localhost:8080/'
    // }, {
    //   reload: false
    // })
  ]
};
