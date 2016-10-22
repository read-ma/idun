require('dotenv').config({ silent: true });

const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: {
    bundle: './src/app/app.js',
    vendor: [
      'react', 'redux', 'redux-thunk', 'react-dom', 'react-router', 'react-ga', 'react-router-redux',
      'lodash', 'moment', 'chart.js', 'material-ui', 'classnames', 'history', 'axios', 'airbrake-js'
      // To include constants/d3k we need to extract it to its own npm module (it looks in node_modules)
    ],
  },
  devtool: 'source-map',
  output: {
    path: 'dist',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  module: {
    loaders: [{
      test: /\.(jsx|js)$/,
      exclude: /(node_modules)/,
      loaders: ['babel']
    }, {
      test: /\.sass$/,
      loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap')
    }, {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
      loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.sass']
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb/),
    new ExtractTextPlugin('[name].[contenthash].css', {
      allChunks: true
    }),
    new LodashModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/templates/index.ejs'
    }),
    new CopyWebpackPlugin([{ from: 'src/assets/images' }]),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[chunkhash].js'),
    new WebpackMd5Hash(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        API_URL: `"${process.env.API_URL}"`,
        GA_ID: `"${process.env.GA_ID}"`,
        AIRBRAKE_PROJECTID: `"${process.env.AIRBRAKE_PROJECTID}"`,
        AIRBRAKE_URL: `"${process.env.AIRBRAKE_URL}"`,
      }
    })
  ]
};
