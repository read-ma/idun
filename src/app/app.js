// import 'es6-promise/auto';
import 'es6-object-assign/auto';


import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import ErrorNotifier from './ErrorNotifier';
import setupGoogleAnalytics from './googleAnalytics';

import App from './containers/App';

import '../assets/sass/app.sass';

injectTapEventPlugin(); // Needed for onTouchTap, more info:  https://github.com/zilverline/react-tap-event-plugin
ErrorNotifier.setup();
setupGoogleAnalytics();

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
