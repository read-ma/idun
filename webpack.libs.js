const path = require('path');

module.exports = {
  vendor: [
    'react', 'redux', 'redux-thunk', 'react-dom', 'react-router', 'react-ga', 'react-router-redux',
    'lodash', 'moment', 'chart.js', 'material-ui', 'classnames', 'history', 'axios', 'airbrake-js'
    // To include constants/d3k we need to extract it to its own npm module (it looks in node_modules)
  ],
  aliases: {
    'redux-thunk': path.join(__dirname, 'node_modules/redux-thunk/dist/redux-thunk'),
    'react-dom': path.join(__dirname, 'node_modules/react-dom/dist/react-dom'),
    'react-router': path.join(__dirname, 'node_modules/react-router/umd/ReactRouter'),
    'react-router-redux': path.join(__dirname, 'node_modules/react-router-redux/dist/ReactRouterRedux'),
    'react-ga': path.join(__dirname, 'node_modules/react-ga/src/index'),
    'chart.js': path.join(__dirname, 'node_modules/chart.js/dist/Chart'),
    'airbrake-js': path.join(__dirname, 'node_modules/airbrake-js/dist/client'),
    React: path.join(__dirname, 'node_modules/react/dist/react.min'),
    redux: path.join(__dirname, 'node_modules/redux/dist/redux.min'),
    history: path.join(__dirname, 'node_modules/history/umd/history'),
    axios: path.join(__dirname, 'node_modules/axios/dist/axios'),
    classnames: path.join(__dirname, 'node_modules/classnames/index'),
    moment: path.join(__dirname, 'node_modules/moment/min/moment.min')
  }
};
