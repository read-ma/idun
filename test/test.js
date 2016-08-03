const system = require('system');
const helpers = require('./helpers');
const testHelpers = require('./testHelpers');
const $ = require('./selectors');

/* global casper */
/* global __utils__ */
const host = system.env.READMA_URL || 'http://localhost:8080';

casper.test.begin('User can login and logout', 3, function(test) {
  casper
    .start(host + '/#/login')
    .waitForSelector($.loginForm, function() {
      testHelpers.checkUrl(this, 'login');
      this.test.assertExists($.loginForm, 'Login form is present');
      helpers.logIn(this);
      this.capture('cap.png');
    }).then(function() {
      helpers.logOut(this);
    })
    .waitForSelector($.loginForm, function() {
      this.test.assertExists($.loginForm, 'User has logged out successfully');
    })
    .run(function() {
      test.done();
    });
});

casper.test.begin('Page title is correctly set', 1, function(test) {
  const pageTitle = 'ReadMa - Your learning assistant';
  casper
    .start(host)
    .then(function() {
      test.assertTitle(pageTitle, 'Page has correct title');
    })
    .run(function() {
      test.done();
    });
});

casper.test.begin('Home screen - pre login', 1, function(test) {
  casper
    .start(host)
    .then(function() {
      testHelpers.checkUrl(this, 'home');
    })
    .run(function() {
      test.done();
    });
});

casper.test.begin('User can add his own translation to dictionary', 1, function(test) {
  casper
    .start(host)
    .waitForSelector($.articleParagraph, function() {
      this.clickLabel('language', 'span');
    })
    .waitForSelector($.userCustomDefinitions, function() {
      this.sendKeys($.newTranslationInput, 'My translation \n');
    })
    .waitForSelector($.userDefinitionBox, function() {
      this.test.assertEval(function(selector) {
        return __utils__.findAll(selector).length > 1;
      }, 'More than one definition is present', $.userDefinitionListItem);
    })
    .run(function() {
      test.done();
    });
});

casper.test.begin('Query articles', 3, function(test) {
  casper
    .start(host + '/#/articles')
    .waitForSelector($.loginForm, function() {
      helpers.logIn(this);
    })
    .waitForSelector($.articlesLinks, function() {
      const articlesNumber = 100;

      testHelpers.checkUrl(this, 'articles');
      this.test.assertExists($.searchInput, 'Query article input is present');
      this.test.assertEvalEqual(function() {
        return __utils__.findAll('div.articles div a').length;
      }, articlesNumber, 'There is ' + articlesNumber + ' articles');
    })
    .run(function() {
      test.done();
    });
});

casper.test.begin('Home screen - post login', 1, function(test) {
  casper
    .start(host + '/#/login')
    .waitForSelector($.loginForm, function() {
      helpers.logIn(this);
    })
    .waitForSelector($.myProfileContainer, function() {
      test.assertExists($.learningProgressChart);
    })
    .run(function() {
      test.done();
    });
});
