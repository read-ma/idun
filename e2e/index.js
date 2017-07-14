const url = require('./lib/url');
const $ = require('./lib/selectors');

const user = {
  login: process.env.TEST_LOGIN,
  password: process.env.TEST_PASSWORD
}

module.exports = {
  tags: ['core'],
  beforeEach: (browser) => {
    browser.execute(function() {
      localStorage.clear();
    }, {});
  },
  'User can login and logout': (browser) => {
    browser
      .url(url.root)
      .assert.title('ReadMa - Your learning assistant')
      .assert.urlContains('home')
      .waitForElementVisible('body')
      .assert.visible($.articleWrapper)
      .click($.toggleLeftNavButton)
      .assert.elementNotPresent($.signOutButton)
      .assert.visible($.loginButton)
      .click($.loginButton)
      .assert.containsText('.MaterialForm-Header h2', 'Please log in')
      .assert.urlContains('login')
      .assert.visible('#email')
      .setValue('#email', user.login)
      .assert.visible('#password')
      .setValue('#password', user.password)
      .assert.visible('.MaterialForm-SubmitButton')
      .assert.visible('.MaterialForm-Info')
      .click('.MaterialForm-SubmitButton')
      .pause(1000)
      .assert.containsText('.Appbar', user.login)
      .assert.visible('#learning-progress-chart')
      .assert.elementsCount('.Articles-List .ArticleLink', 4)
      .click($.toggleLeftNavButton)
      .assert.visible($.signOutButton)
      .click($.signOutButton)
      .assert.containsText('.FormMessage-info', 'You are now logged out.')
      .saveScreenshot('test/e2e/screenshots/screen.png')
      .end();
  }
};
