// const autoprefixer = require('autoprefixer');
// const postcssfixes = require('postcss-fixes');
// const mqpacker = require('css-mqpacker');
// const cssnano = require('cssnano');

// const production = process.env.NODE_ENV.toLowerCase() === 'production';

// let plugins = [
//   postcssfixes(),
//   autoprefixer(),
//   mqpacker()
// ];

// if (production) {
//   plugins.push(cssnano({ safe: true, autoprefixer: false }));
// }

// module.exports = plugins;

const mqpacker = require("css-mqpacker");
const fixes = require("postcss-fixes");
const focus = require("postcss-focus");
const calc = require("postcss-calc");
const pseudoelements = require("postcss-pseudoelements");
const autoprefixer = require("autoprefixer");

module.exports = ({ file, options, env }) => {
  if (!env) { return {}; }
  return {
    plugins: [
      mqpacker(),
      fixes(),
      focus(),
      calc(),
      pseudoelements(),
      autoprefixer()
    ]
  }
};
