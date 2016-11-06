import api from '../api';
import store from '../store';
import { push } from 'react-router-redux';
import ls from '../localStore';
import _ from 'lodash';
import { map } from 'lodash/map';
import ReactGA from 'react-ga';

const DEFAULT_RETURN_TO = '/profile';

const returnTo = (state) => {
  try {
    return state.routing.locationBeforeTransitions.query.next || DEFAULT_RETURN_TO;
  } catch (e) {
    return DEFAULT_RETURN_TO;
  }
};

function userAccountCreated() {
  return {
    type: 'USER_ACCOUNT_CREATED'
  };
}

function userSigningUpError(error) {
  return {
    type: 'SIGNUP_ERROR',
    payload: error
  };
}

const signupAttempt = (user) => {
  return (dispatch) => {
    api
      .post(
        '/users.json', { user }
      )
      .then(() => {
        dispatch(userAccountCreated());
      })
      .catch(function(error) {
        let emailErrors = '';
        let passwordErrors = '';

        if (error.response.data.errors) {
          if (error.response.data.errors.email) {
            emailErrors = `E-mail ${error.response.data.errors.email}.`;
          }

          if (error.response.data.errors.password) {
            passwordErrors = `Password ${error.response.data.errors.password}.`;
          }
        }

        dispatch(userSigningUpError([emailErrors, passwordErrors]));
      });
  };
};

const userLoggedIn = (userData) => {
  ls.set('AUTH_TOKEN', userData.auth_token);
  ls.set('IS_AUTHENTICATED', true);
  ls.set('CURRENT_USER_EMAIL', userData.email);

  if (userData.isAdmin) {
    ls.set('IS_ADMIN', userData.isAdmin);
  }
  ReactGA.set({ userId: userData.email });

  return {
    type: 'USER_LOGGED_IN',
    payload: Object.assign({}, userData, { isAdmin: userData.isAdmin }),
  };
};

const userSigningInError = (error) => {
  return {
    type: 'USER_SIGNING_IN_ERROR',
    payload: error
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
    .catch(function(error) {
      dispatch(userSigningInError([error.response.data.error]));
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


/*
  TODO:
    Change API responses so that this is not needed.
    OR
    Unify API responses so that all of them look like this and extract this logic to its own module
*/
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
      .then(() => {
        dispatch({ type: 'PASSWORD_UPDATED' });
        dispatch(push('login', { q: 'updated' }));
      })
      .catch(({ response }) => {
        dispatch(updatePasswordError(extractErrors(response.data.errors)));
      });
  };
};

const confirmEmail = ({ confirmation_token }) => {
  return (dispatch) => {
    api
      .get(`/confirmations.json?confirmation_token=${confirmation_token}`)
      .then(() => {
        dispatch(push('login', { q: 'confirmed' }));
        dispatch({ type: 'EMAIL_CONFIRMED' });
      })
      .catch(({ response }) => {
        dispatch(updatePasswordError(extractErrors(response.data.errors)));
      });
  };
};


export { loginAttempt, signupAttempt, logout, resetPassword, updatePassword, confirmEmail };
