import ls from '../localStore';

function stateFromLocalStorage() {
  return {
    isAuthenticated: ls.get('IS_AUTHENTICATED', 'bool'),
    auth_token: ls.get('AUTH_TOKEN'),
    email: ls.get('CURRENT_USER_EMAIL'),
    isAdmin: ls.get('IS_ADMIN', 'bool'),
  };
}

export default function auth(state = stateFromLocalStorage(), action) {
  switch (action.type) {

  // case '@@router/LOCATION_CHANGE':
  //   return Object.assign(
  //     {},
  //     state,
  //     { message: null },
  //     { error: null }
  //   );

  case 'PASSWORD_UPDATED':
    return Object.assign(
      {},
      state,
      { error: null },
      { message: 'Your password has been updated. You can now log in.' }
    );

  case 'EMAIL_CONFIRMED':
    return Object.assign(
      {},
      state,
      { error: null },
      { message: 'Thank you! You have confirmed your email. Please log in and start using the app.' }
    );

  case 'CHANGE_PASSWORD_REQUEST_ERROR':
    return Object.assign(
      {},
      state,
      { message: null },
      { error: 'Email you entered does not exist in our database.' }
    );

  case 'UPDATE_PASSWORD_ERROR':
    return Object.assign(
      {},
      state,
      { message: null },
      { error: action.payload }
    );

  case 'CHANGE_PASSWORD_REQUESTED':
    return Object.assign(
      {},
      state,
      { error: null },
      { message: 'Furhter instructions will be sent to your email within 10 minutes' }
    );

  case 'USER_SIGNING_IN_ERROR':
  case 'SIGNUP_ERROR':
    return Object.assign(
      {},
      state,
      { isAuthenticated: false },
      { isAdmin: false },
      { error: JSON.stringify(action.payload.response.data.errors) }
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

  case 'USER_ACCOUNT_CREATED':
    return Object.assign(
      {},
      state,
      {
        error: null,
        message: 'Thank you! Please check your email box for a message from us! See you soon!'
      }
    );

  default:
    return state;
  }
}
