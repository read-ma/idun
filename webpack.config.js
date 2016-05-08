var ExtractTextPlugin = require("extract-text-webpack-plugin");
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: "./src/app/app.js",
  output: {
    filename: "public/bundle.js"
  },
  externals: {
    'Config': JSON.stringify({ apiUrl: 'http://api.readma.com/api' })
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
    new ExtractTextPlugin('public/style.css', {
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:8080/'
    },
    {
      reload: false
    })
  ]
};
