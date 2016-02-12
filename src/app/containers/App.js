import React, { Component } from 'react';
import { Router } from 'react-router';

import { Provider } from 'react-redux';
import routes from '../config/routes';
import store from '../store';

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <Router>{routes}</Router>
        </Provider>
    );
  }
}

export default App;
