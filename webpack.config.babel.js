require('dotenv').config({ silent: true });

import path from 'path';
import os from 'os';
import log from 'npmlog';

import webpack from 'webpack';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import DashboardPlugin from 'webpack-dashboard/plugin';

// Build performance boosts
import WebpackLibs from './webpack.libs.js';

const NODE_ENV = process.env.NODE_ENV || 'development';
const production = NODE_ENV === 'production';


const PROD_SOURCEMAPS = 'source-map';
const DEV_SOURCEMAPS = 'cheap-module-eval-source-map';

const BUILD_DIR = path.join(__dirname, 'dist');

const extractCSS = new ExtractTextPlugin('[name].[chunkhash].css');

// ==== Plugins config
let plugins = [
  extractCSS,
  new HtmlWebpackPlugin({ template: './src/templates/index.ejs' }),
  new CopyWebpackPlugin([
    { from: 'src/assets/images' },
    { from: 'src/assets/root' }
  ]),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.[chunkhash].js'
  }),
  new webpack.EnvironmentPlugin(['NODE_ENV']),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
      API_URL: `"${process.env.API_URL}"`,
      GA_ID: `"${process.env.GA_ID}"`,
      AIRBRAKE_PROJECTID: `"${process.env.AIRBRAKE_PROJECTID}"`,
      AIRBRAKE_URL: `"${process.env.AIRBRAKE_URL}"`,
    }
  })
];


if (!production) {
  log.warn('Running in development env.');

  plugins.push(new DashboardPlugin()); // Turn on NASA panel

  plugins.push( // This does something. Im almost sure. ;->
    new webpack.LoaderOptionsPlugin({
      debug: true,
      outputPath: BUILD_DIR
    })
  );
}

if (production) {
  log.warn('Running in production env.');

  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false,
      },
      sourceMap: true
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb/),
    new WebpackMd5Hash()
  );
}

module.exports = {
  entry: {
    bundle: './src/app/app.js',
    vendor: WebpackLibs.vendor
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    devtoolLineToLine: true,
    pathinfo: true,
    sourceMapFilename: '[file].map',
  },
  devtool: (production ? PROD_SOURCEMAPS : DEV_SOURCEMAPS),
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
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        use: ['babel-loader?cacheDirectory'],
        exclude: /node_modules/
      },
      {
        test: /\.s(a|c)ss$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        }),
        exclude: /node_modules/
      },
      // {
      //   test: /\.svg$/,
      //   use: ['svg-loader'],
      //   exclude: /node_modules/
      // },
      {
        test: /\.(eot|woff|woff2|ttf|gif|png|jpg|svg)$/,
        use: 'url-loader?limit=10000&name=[name].[ext]'
      }
    ]
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.sass'],
    alias: WebpackLibs.aliases
  },
  plugins: plugins
};
