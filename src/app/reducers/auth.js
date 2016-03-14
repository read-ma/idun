import ls from '../localStore';

function stateFromLocalStorage() {
  return {
    isAuthenticated: !!ls.get('IS_AUTHENTICATED'),
    auth_token:        ls.get('AUTH_TOKEN')
  };
};

export default function auth(state = stateFromLocalStorage(), action){
  switch(action.type){

  case 'PASSWORD_UPDATED':
    return Object.assign(
      {},
      state,
      {message: 'Your password has been updated. Please log in.' }
    );

  case 'CHANGE_PASSWORD_REQUEST_ERROR':
    return Object.assign(
      {},
      state,
      {error: 'We could find it. Your email does not exist in the system.' }
    );

  case 'UPDATE_PASSWORD_ERROR':
    return Object.assign(
      {},
      state,
      {error: action.payload.errors.reset_password_token ? "Token is invalid. Visit reset token page again.":"Check new password and confirmation"}
    );

  case 'CHANGE_PASSWORD_REQUESTED':
    return Object.assign(
      {},
      state,
      {message: "Check your email for a reset password link"}
    );

  case 'USER_SIGNING_IN_ERROR':
    return Object.assign(
      {},
      state,
      {isAuthenticated: false},
      {error: action.payload}
    );

  case 'USER_LOGGED_OUT':
    return Object.assign(
      {},
      state,
      action.payload
    );

  case 'USER_LOGGED_IN':
    return Object.assign(
      {},
      state,
      {isAuthenticated: true},
      action.payload
    );

  case 'INVITATION_REQUEST_SENT':
    return Object.assign(
      {},
      state,
      {signupMessage: 'Thank you! We have received your request and we will be back to you shortly!'}
    );

  default:
    return state;
  }
}
