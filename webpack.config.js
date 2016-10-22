require('dotenv').config({ silent: true });

const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBrowserPlugin = require('webpack-browser-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const DashboardPlugin = require('webpack-dashboard/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    bundle: './src/app/app',
    vendor: [
      'react', 'redux', 'redux-thunk', 'react-dom', 'react-router', 'react-ga', 'react-router-redux',
      'lodash', 'moment', 'chart.js', 'material-ui', 'classnames', 'history', 'axios', 'airbrake-js'
      // To include constants/d3k we need to extract it to its own npm module (it looks in node_modules)
    ],
  },
  devtool: 'eval-source-map',
  devServer: {
    quiet: true
  },
  output: {
    path: 'public',
    filename: '[name].js',
    chunkFilename: '[name].js',
    devtoolLineToLine: true,
    pathinfo: true,
    sourceMapFilename: '[name].map',
  },
  module: {
    loaders: [
      {
        test: /\.(jsx?)$/,
        exclude: /(node_modules)/,
        loaders: ['babel']
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('css!sass')
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'url-loader?limit=20000&name=[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.sass']
  },
  plugins: [
    new DashboardPlugin(),
    new LodashModuleReplacementPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb/),
    new CopyWebpackPlugin([{ from: 'src/assets/images' }]),
    new HtmlWebpackPlugin({
      template: './src/templates/index.ejs'
    }),
    new ExtractTextPlugin('style.css', {
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
      url: 'http://localhost',
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new WebpackMd5Hash(),
    new webpack.optimize.OccurenceOrderPlugin(),
  ]
};
