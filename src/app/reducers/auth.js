import ls from '../localStore';

function stateFromLocalStorage() {
  return {
    isAuthenticated: !!ls.get('IS_AUTHENTICATED'),
    auth_token: ls.get('AUTH_TOKEN'),
    email: ls.get('CURRENT_USER_EMAIL'),
    isAdmin: !!ls.get('IS_ADMIN'),
  };
}

export default function auth(state = stateFromLocalStorage(), action) {
  switch (action.type) {

  case '@@router/LOCATION_CHANGE':
    return Object.assign(
      {},
      state,
      { notice: null },
      { error: null }
    );

  case 'PASSWORD_UPDATED':
    return Object.assign(
      {},
      state,
      { error: null },
      { notice: 'Your password has been updated. You can now log in.' }
    );

  case 'CHANGE_PASSWORD_REQUEST_ERROR':
    return Object.assign(
      {},
      state,
      { notice: null },
      { error: 'Email you entered does not exist in our database.' }
    );

  case 'UPDATE_PASSWORD_ERROR':
    return Object.assign(
      {},
      state,
      { notice: null },
      { error: action.payload }
    );

  case 'CHANGE_PASSWORD_REQUESTED':
    return Object.assign(
      {},
      state,
      { error: null },
      { notice: 'Furhter instructions will be sent to your email within 10 minutes' }
    );

  case 'USER_SIGNING_IN_ERROR':
    return Object.assign(
      {},
      state,
      { isAuthenticated: false },
      { isAdmin: false },
      { error: action.payload }
    );

  case 'LOGOUT_USER':
    return Object.assign(
      {},
      state,
      action.payload
    );

  case 'USER_LOGGED_IN':
    return Object.assign(
      {},
      state,
      { isAuthenticated: true },
      action.payload
    );

  case 'INVITATION_REQUEST_SENT':
    return Object.assign(
      {},
      state,
      { signupMessage: 'Thank you! We have received your request and we will get back to you shortly!' }
    );

  default:
    return state;
  }
}
