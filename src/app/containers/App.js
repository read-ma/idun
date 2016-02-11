import React, { Component } from 'react';
import { Router } from 'react-router';

import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


import routes from '../config/routes';
import * as reducers from '../reducers';

const reducer = combineReducers(reducers);
const store = applyMiddleware(thunk)(createStore)(reducer);


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
