const path = require('path');

const MODULES = path.join(__dirname, 'node_modules');

module.exports = {
  'redux-thunk': path.join(MODULES, 'redux-thunk', 'dist', 'redux-thunk'),
  'react-dom': path.join(MODULES, 'react-dom', 'dist', 'react-dom'),
  'react-router': path.join(MODULES, 'react-router', 'umd', 'ReactRouter'),
  'react-router-redux': path.join(MODULES, 'react-router-redux', 'dist', 'ReactRouterRedux'),
  'react-ga': path.join(MODULES, 'react-ga', 'src', 'index'),
  'chart.js': path.join(MODULES, 'chart.js', 'dist', 'Chart'),
  React: path.join(MODULES, 'react', 'dist', 'react.min'),
  redux: path.join(MODULES, 'redux', 'dist', 'redux.min'),
  history: path.join(MODULES, 'history', 'umd', 'history'),
  axios: path.join(MODULES, 'axios', 'dist', 'axios'),
  classnames: path.join(MODULES, 'classnames', 'index'),
  moment: path.join(MODULES, 'moment', 'moment')
};
