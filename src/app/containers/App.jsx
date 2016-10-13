import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import routes from '../config/routes';
import store from '../store';

import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import readmaTheme from '../config/readmaTheme';

const history = syncHistoryWithStore(hashHistory, store);

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={readmaTheme}>
        <Provider store={store}>
          <Router history={history}>
            {routes}
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
