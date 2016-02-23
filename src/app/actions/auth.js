import api from '../api';
import store from '../store';
import {push} from 'react-router-redux';

const loginAttempt = (email, password) => {
    return (dispatch) => {
        api.post(
            '/login.json',
            {admin_user:{email: email, password: password}}
        )
            .then( (response) => {
                dispatch(userLoggedIn(response.data));
                let next = store.getState().routing.locationBeforeTransitions.query.next;

                if (next){
                    dispatch(push(next));
                }
                else
                    dispatch(push('/profile'));
            });
    };
};

const userLoggedIn = (userData) => {
    return {
        type: 'USER_LOGGED_IN',
        payload: userData
    };
};


export { loginAttempt }
