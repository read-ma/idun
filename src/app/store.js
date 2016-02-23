import * as reducers from './reducers';
import { combineReducers } from 'redux';
import { Router, hashHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const reducer = combineReducers(
    Object.assign(
        {},
        reducers,
        {routing: routerReducer}
    ));;

const middleware = routerMiddleware(hashHistory);
const store = createStore(reducer, applyMiddleware(thunk,middleware));

export default store;
