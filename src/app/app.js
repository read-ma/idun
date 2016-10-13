import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import ErrorNotifier from './ErrorNotifier';
import { watchResize } from './Responsive'; // For some reason this throws error if loaded before error notifier.
import setupGoogleAnalytics from './googleAnalytics';

import App from './containers/App';

injectTapEventPlugin(); // Needed for onTouchTap, more info:  https://github.com/zilverline/react-tap-event-plugin
ErrorNotifier.setup();
setupGoogleAnalytics();
watchResize();

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
