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
const createStoreWithMiddleware = applyMiddleware(middleware, thunk)(createStore);

function loadDbFromLocalStoraget() {
    return {
        main: {
            profile: {
                name: 'your name'
            },
            userDefinitions: []
        },
        auth: {
            isAuthenticated: !!localStorage.getItem('IS_AUTHENTICATED'),
            auth_token:        localStorage.getItem('AUTH_TOKEN')
        },
    };
};

const store = createStoreWithMiddleware(reducer, loadDbFromLocalStoraget());
export default store;
