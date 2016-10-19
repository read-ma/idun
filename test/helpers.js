const $ = require('./selectors');

module.exports = {
  goToLogin: function(context) {
    context.click($.loginButton);
  },
  logIn: function(context) {
    context.fill($.loginForm, {
      email: 'demo@readma.com',
      password: 'demo@readma.com'
    }, true);
  },
  logOut: function(context) {
    context.click($.signOutButton);
  },
  tearDown: function(casper) {
    casper.evaluate(function() {
      localStorage.clear();
    }, {})
  }
};
