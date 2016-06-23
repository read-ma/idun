import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App.jsx';
import ErrorNotifier from './ErrorNotifier.js';
import injectTapEventPlugin from 'react-tap-event-plugin';

import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import themeDecorator from 'material-ui/lib/styles/theme-decorator';
import setupGoogleAnalytics from './googleAnalytics';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

ErrorNotifier.setup();
setupGoogleAnalytics();

const Application = () => (
  <themeDecorator muiTheme={getMuiTheme()}>
    <App />
  </themeDecorator>
);

ReactDOM.render(
  <Application />,
  document.getElementById('app')
);
