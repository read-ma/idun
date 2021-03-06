require('dotenv').config({ silent: true });

import path from 'path';
import log from 'npmlog';

import webpack from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import OfflinePlugin from 'offline-plugin';

import PurifyCSSPlugin from 'purifycss-webpack';
import PurifyCSSConfig from './purifycss.config.js';

// import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import BellOnBundlerErrorPlugin from 'bell-on-bundler-error-plugin';

const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'development';
const is_production = NODE_ENV === 'production';

const getPlugins = function(opts) {
  let plugins = [
    opts.extractCSS,
    new HtmlWebpackPlugin({ template: './src/templates/index.ejs' }),
    new CopyWebpackPlugin([{ from: 'src/assets/images' }, { from: 'src/assets/root' }]),
    /*
      TODO:
        Make more chunks
        - split commons into couple more + async
    */
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      minChunks: function(module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.ProvidePlugin({
      airbrakeJs: 'airbrakeJs'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
        API_URL: `"${process.env.API_URL}"`,
        GA_ID: `"${process.env.GA_ID}"`,
        AIRBRAKE_PROJECTID: `"${process.env.AIRBRAKE_PROJECTID}"`,
        AIRBRAKE_URL: `"${process.env.AIRBRAKE_URL}"`
      }
    }),
    new OfflinePlugin({
      publicPath: '/',
      caches: {
        main: ['bundle.*.js', 'commons.*.js', 'bundle.*.css'],
        optional: [':rest:']
      },
      ServiceWorker: {
        navigateFallbackURL: '/',
        events: true
      },
      safeToUseOptionalCaches: true
    })
  ];

  if (is_production) {
    log.warn('Running in production env.');

    plugins.push(
      // new LodashModuleReplacementPlugin, // TODO: Investigate, fix
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb/),
      new PurifyCSSPlugin(PurifyCSSConfig())
    );
  }

  plugins.push();

  return plugins;
};

module.exports = getPlugins;
