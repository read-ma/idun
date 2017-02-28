const autoprefixer = require('autoprefixer');
const postcssfixes = require('postcss-fixes');
const mqpacker = require('css-mqpacker');
const cssnano = require('cssnano');

const production = process.env.NODE_ENV.toLowerCase() === 'production';

let plugins = [
  postcssfixes(),
  autoprefixer(),
  mqpacker()
];

if (production) {
  plugins.push(cssnano({ safe: true, autoprefixer: false }));
}

module.exports = plugins;
