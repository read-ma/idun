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
      {error: undefined},
      {message: 'Your password has been updated. You can now log in.' }
    );

  case 'CHANGE_PASSWORD_REQUEST_ERROR':
    return Object.assign(
      {},
      state,
      {message: undefined},
      {error: 'Email you entered does not exist in our database.' }
    );

  case 'UPDATE_PASSWORD_ERROR':
    return Object.assign(
      {},
      state,
      {message: undefined},
      {error: action.payload}
    );

  case 'CHANGE_PASSWORD_REQUESTED':
    return Object.assign(
      {},
      state,
      {error: undefined},
      {message: "Instructions has been sent to your email."}
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
      {signupMessage: 'Thank you! We have received your request and we will get back to you shortly!'}
    );

  default:
    return state;
  }
}
