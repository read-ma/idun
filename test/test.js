const system = require('system');
const helpers = require('./helpers');

/* global casper */
/* global __utils__ */
const host = system.env.READMA_URL || 'http://localhost:8080';

casper.test.begin('User can login and logout', 3, function(test) {
  casper
    .start(host + '/#/login')
    .waitForSelector('form#loginForm', function() {
      helpers.checkUrl(this, 'login');
      this.test.assertExists('form#loginForm', 'Login form is present');
      helpers.logIn(this);
    }).then(function() {
      helpers.logOut(this);
    })
    .waitForSelector('form#loginForm', function() {
      this.test.assertExists('form#loginForm', 'User has logged out successfully');
    })
    .run(function() {
      test.done();
    });
});

casper.test.begin('Home screen and page title', 2, function(test) {
  const pageTitle = 'ReadMa - Your learning assistant';

  casper
    .start(host)
    .then(function() {
      helpers.checkUrl(this, 'home');
      test.assertTitle(pageTitle, 'Page has correct title');
    })
    .run(function() {
      test.done();
    });
});

casper.test.begin('Query articles', 3, function(test) {
  casper
    .clear()
    .start(host + '/#/articles')
    .waitForSelector('form#loginForm', function() {
      helpers.logIn(this);
    })
    .waitForSelector('.articles a', function() {
      const articlesNumber = 100;

      helpers.checkUrl(this, 'articles');
      this.test.assertExists('input[id="articleSearch"]', 'Query article input is present');
      this.test.assertEvalEqual(function() {
        return __utils__.findAll('div.articles div a').length;
      }, articlesNumber, 'There is ' + articlesNumber + ' articles');
    })
    .run(function() {
      test.done();
    });
});
