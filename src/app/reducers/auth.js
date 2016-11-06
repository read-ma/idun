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

  // TODO: Make error/notice/info keys configurable
  // Allow "keep: true" when route changes instead of clearing errors
  case '@@router/LOCATION_CHANGE':
    return Object.assign(
      {},
      state,
      { error: [] }
    );

  case 'PASSWORD_UPDATED':
    return Object.assign(
      {},
      state,
      { notice: ['Your password has been changed. You can now log in.'] },
      { info: [] }
    );

  case 'EMAIL_CONFIRMED':
    return Object.assign(
      {},
      state,
      { notice: ['Thank you! You have confirmed your email.', 'Please log in and start using the app.'] },
      { info: [] }
    );

  case 'CHANGE_PASSWORD_REQUESTED':
    return Object.assign(
      {},
      state,
      { error: [] },
      { notice: ['Further instructions will be sent to your email within 5 minutes.'] },
      { info: ['If you don\'t receive email from us in couple minutes, please try again.'] }
    );

  case 'CHANGE_PASSWORD_REQUEST_ERROR':
    return Object.assign(
      {},
      state,
      { error: ['Email you entered does not exist in our database.'] },
      { notice: [] },
      { info: [] }
    );

  case 'UPDATE_PASSWORD_ERROR':
    return Object.assign(
      {},
      state,
      { error: action.payload },
      { notice: [] },
      { info: [] }
    );

  case 'USER_SIGNING_IN_ERROR':
  case 'SIGNUP_ERROR':
    return Object.assign(
      {},
      state,
      { isAuthenticated: false },
      { isAdmin: false },
      { error: action.payload },
      { notice: [] },
      { info: [] }
    );

  case 'LOGOUT_USER':
    return Object.assign(
      {},
      state,
      { error: [] },
      { notice: [] },
      { info: ['You are now logged out.'] },
      action.payload
    );

  case 'USER_LOGGED_IN':
    return Object.assign(
      {},
      state,
      { isAuthenticated: true },
      { error: [] },
      { notice: [] },
      { info: [] },
      action.payload
    );

  case 'USER_ACCOUNT_CREATED':
    return Object.assign(
      {},
      state,
      { error: [] },
      { notice: ['Thank you! Please check your email box for a notice from us! See you soon!'] },
      { info: [] }
    );

  default:
    return state;
  }
}
