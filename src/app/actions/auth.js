import api from '../api';
import store from '../store';
import {push} from 'react-router-redux';

const ReturnTo = (state) => {
    try {
        return state.routing.locationBeforeTransitions.query.next;
    }
    catch(e) {
        return '/profile';
    };
};

const loginAttempt = (email, password) => {

    return (dispatch) => {
        api.post(
            '/login.json',
            {admin_user:{email: email, password: password}}
        )
            .then( (response) => {
                dispatch(userLoggedIn(response.data));

                dispatch(
                    push(ReturnTo(store.getState()))
                );
            })
            .catch(function (response) {
                dispatch(userSigningInError(response));
            });
        ;
    };
};

const userLoggedIn = (userData) => {
    localStorage.setItem('AUTH_TOKEN', userData.auth_token);
    localStorage.setItem('IS_AUTHENTICATED', true);
    return {
        type: 'USER_LOGGED_IN',
        payload: userData
    };
};

const userSigningInError = (payload) => {
    return error('USER_SIGNING_IN_ERROR', payload);
};

const error = (type, payload) => {
    return {
        type: 'USER_SIGNING_IN_ERROR',
        payload: payload
    };
}

export { loginAttempt, error }
