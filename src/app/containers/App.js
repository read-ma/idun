import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import routes from '../config/routes';
import store from '../store';

const history = syncHistoryWithStore(hashHistory, store);

class App extends Component {
  render() {
      return (
          <Provider store={store}>
            <Router history={history}>
              {routes}
            </Router>
          </Provider>
      );
  }
}

export default App;
