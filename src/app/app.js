import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App.jsx';
import ErrorNotifier from './ErrorNotifier.js'

ErrorNotifier.setup();

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
