var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
    entry: path.resolve(__dirname, './src/app/app.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    externals: {
        'Config': JSON.stringify({ apiUrl: 'http://ms-dashboard.herokuapp.com/api' })
    },

    module: {
        loaders: [{
            test: /\.jsx?$/,

            // There is not need to run the loader through
            // vendors
            exclude: [node_modules_dir],
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015']
            }},
                  {
                      test: /\.scss$/,
                      loader: ExtractTextPlugin.extract('css!sass')
                  }]
    },
    plugins: [
        new ExtractTextPlugin('public/style.css', {
            allChunks: true
        })
    ]

};

module.exports = config;
