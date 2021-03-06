import * as reducers from './reducers';
import { combineReducers } from 'redux';
import { hashHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import gaMiddleware from './gaMiddleware.js';

const reducer = combineReducers(
  Object.assign(
    {},
    reducers,
    { routing: routerReducer }
  ));

const routerMdl = routerMiddleware(hashHistory);
const createStoreWithMiddleware = applyMiddleware(routerMdl, thunk, gaMiddleware)(createStore);

const store = createStoreWithMiddleware(reducer, process.env.NODE_ENV === 'development'
  && window.devToolsExtension && window.devToolsExtension());

export default store;
