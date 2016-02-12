import * as reducers from './reducers';
import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const reducer = combineReducers(reducers);
const store = applyMiddleware(thunk)(createStore)(reducer);

export default store;
