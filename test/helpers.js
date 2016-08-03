module.exports = {
  logIn: function(context) {
    context.fill('form#loginForm', {
      email: 'demo@readma.com',
      password: 'demo@readma.com'
    }, true);
  },
  logOut: function(context) {
    context.click('#signOutButton');
  }
};
