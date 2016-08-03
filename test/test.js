const system = require('system');

/* global casper */
/* global __utils__ */
const host = system.env.READMA_URL || 'http://localhost:8080';

casper.test.begin('Login page', 1, function (test) {
  casper.start(host)
    .clear()
    .then(function () {
      const pageTitle = 'ReadMa - Your learning assistant';
      test.assertTitle(pageTitle, 'Page has correct title');
    })
    .run(function () {
      test.done();
    });
});

casper.test.begin('Home screen', 1, function (test) {
  casper
    .clear()
    .start(host)
    .then(function () {
      test.assertUrlMatch(/home/);
    })
    .run(function () {
      test.done();
    });
});

casper.test.begin('Query articles', 5, function (test) {
  casper
    .clear()
    .start(host + '/#/articles', function(){
      casper.click('#signOutButton');
    })
    .waitForSelector('form#loginForm', function() {
      this.test.assertUrlMatch(/#\/login/);
      this.test.assertExists('form#loginForm', '#loginForm is there');

      this.fill('form#loginForm', {
        email: 'demo@readma.com',
        password:  'demo@readma.com'
      }, true);
    })
    .waitForSelector('.articles a', function() {
      this.test.assertUrlMatch(/#\/articles/);
      this.test.assertExists('input[id="articleSearch"]', 'query artile field');
      this.test.assertEvalEqual(function() {
        return __utils__.findAll("div.articles div a").length;
      }, 100);
    })
    .run(function() {
      test.done();
    });
});
