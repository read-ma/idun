require('dotenv').config();
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/app/app.js',
  output: {
    filename: 'public/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      hash: true
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
    })
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
