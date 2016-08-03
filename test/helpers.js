const pagesPatterns = {
  articles: /#\/articles/,
  home: /home/,
  login: /#\/login/
};

module.exports = {
  logIn: function(context) {
    context.fill('form#loginForm', {
      email: 'demo@readma.com',
      password: 'demo@readma.com'
    }, true);
  },
  logOut: function(context) {
    context.click('#signOutButton');
  },
  checkUrl: function(context, pageName) {
    context.test.assertUrlMatch(pagesPatterns[pageName], 'User is at "' + pageName + '" page');
  }
};
