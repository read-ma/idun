import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App.jsx';
import ErrorNotifier from './ErrorNotifier';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { watchResize } from './Responsive';

watchResize();

// import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
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
  <themeDecorator muiTheme={ThemeManager.getMuiTheme()}>
    <App />
  </themeDecorator>
);

ReactDOM.render(
  <Application />,
  document.getElementById('app')
);
