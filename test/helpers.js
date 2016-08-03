const $ = require('./selectors');

module.exports = {
  logIn: function(context) {
    context.fill($.loginForm, {
      email: 'demo@readma.com',
      password: 'demo@readma.com'
    }, true);
  },
  logOut: function(context) {
    context.click($.signOutButton);
  }
};
