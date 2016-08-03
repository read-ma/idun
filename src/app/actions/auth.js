import api from '../api';
import store from '../store';
import { push } from 'react-router-redux';
import ls from '../localStore';
import _ from 'lodash';
import ReactGA from 'react-ga';

const DEFAULT_RETURN_TO = '/';

const returnTo = (state) => {
  try {
    return state.routing.locationBeforeTransitions.query.next || DEFAULT_RETURN_TO;
  } catch (e) {
    return DEFAULT_RETURN_TO;
  }
};

function invitationRequestSent(data) {
  return {
    type: 'INVITATION_REQUEST_SENT',
    payload: data.invitation_request
  };
}

function userSigningUpError(error) {
  return {
    type: 'SIGNUP_ERROR',
    payload: error
  };
}

const signupAttempt = (email) => {
  return (dispatch) => {
    api.post(
      '/invitation_requests.json',
      {
        invitation_request: { email: email }
      }
    )
      .then((response) => {
        dispatch(invitationRequestSent(response.data));
      })
      .catch(function(response) {
        dispatch(userSigningUpError(response));
      });
  };
};

const userLoggedIn = (userData) => {
  ls.set('AUTH_TOKEN', userData.auth_token);
  ls.set('IS_AUTHENTICATED', true);
  ls.set('CURRENT_USER_EMAIL', userData.email);

  if (userData.su) {
    ls.set('IS_ADMIN', userData.su);
  }
  ReactGA.set({ userId: userData.email });

  return {
    type: 'USER_LOGGED_IN',
    payload: Object.assign({}, userData, { isAdmin: userData.su }),
  };
};

const userSigningInError = () => {
  return {
    type: 'USER_SIGNING_IN_ERROR',
    payload: 'We could not let you in with entered credentials. No way.'
  };
};

const loginAttempt = (email, password) => {
  return (dispatch) => {
    api.post(
      '/login.json',
      { admin_user: { email: email, password: password } }
    )
    .then((response) => {
      dispatch(userLoggedIn(response.data));
      dispatch(push(returnTo(store.getState())));
    })
    .catch(function(response) {
      dispatch(userSigningInError(response));
    });
  };
};


const logoutUser = () => {
  ls.clearAll();
  return {
    type: 'LOGOUT_USER',
    payload: {
      auth_token: undefined,
      isAuthenticated: false
    }
  };
};

const logout = () => {
  return (dispatch) => {
    dispatch(logoutUser());
    dispatch(push('/login'));
  };
};

const changePasswordRequested = (response) => {
  return {
    type: 'CHANGE_PASSWORD_REQUESTED',
    payload: response
  };
};

const changePasswordRequestError = (error) => {
  return {
    type: 'CHANGE_PASSWORD_REQUEST_ERROR',
    payload: error.data
  };
};

const resetPassword = (email) => {
  return (dispatch) => {
    api
      .post('/reset_password', { email })
      .then((response) => dispatch(changePasswordRequested(response)))
      .catch((error) => dispatch(changePasswordRequestError(error)));
  };
};

const humanize = str => str.replace(/_/g, ' ').toLocaleLowerCase();

const extractErrors = (errors) => {
  return _.map(errors, (err, key) => {
    return _.map(err, e => humanize([key, e].join(' ')));
  });
};

const updatePasswordError = (error) => {
  return {
    type: 'UPDATE_PASSWORD_ERROR',
    payload: error
  };
};

const updatePassword = ({ reset_password_token, password, password_confirmation }) => {
  return (dispatch) => {
    api
      .patch('/reset_password/by.json', {
        reset_password: { reset_password_token, password, password_confirmation }
      })
      .then(() => dispatch(push('login', { q: 'updated' })))
      .catch(({response}) => {
        dispatch(updatePasswordError(extractErrors(response.data.errors)));
      });
  };
};


export { loginAttempt, signupAttempt, logout, resetPassword, updatePassword };
