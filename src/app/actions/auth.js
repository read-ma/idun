import api from '../api';
import store from '../store';
import {push} from 'react-router-redux';
import ls from '../localStore';

const DEFAULT_RETURN_TO = '/articles';


const ReturnTo = (state) => {
  try {
    return state.routing.locationBeforeTransitions.query.next || DEFAULT_RETURN_TO;
  }
  catch(e) {
    return DEFAULT_RETURN_TO;
  };
};

function invitationRequestSent(data) {
  return {
    type: 'INVITATION_REQUEST_SENT',
    payload: data.invitation_request
  };
};

function userSigningUpError(error){
  console.log(error);

  return {
    type: 'SIGNUP_ERROR',
    payload: error
  };
};

const signupAttempt = (email) => {

  return (dispatch) => {
    api.post(
      '/invitation_requests.json',
      {invitation_request: {email: email}}
    )
      .then( (response) => {
        dispatch(invitationRequestSent(response.data));
      })
      .catch(function (response) {
        dispatch(userSigningUpError(response));
      });
    ;
  };
}

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
  ls.set('AUTH_TOKEN', userData.auth_token);
  ls.set('IS_AUTHENTICATED', true);
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
};

const logout = () => {
  ls.clear('AUTH_TOKEN');
  ls.clear('IS_AUTHENTICATED');

  return {
    type: 'USER_LOGGED_OUT',
    payload: {
      auth_token: undefined,
      isAuthenticated: false
    }
  };

};

export { loginAttempt, signupAttempt, logout, error }
