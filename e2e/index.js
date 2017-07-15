const url = require('./lib/url');
const $ = require('./lib/selectors');

const user = {
  login: process.env.TEST_LOGIN,
  password: process.env.TEST_PASSWORD
}

module.exports = {
  before: (browser) => {
    console.log('Running tests @ :', browser.options.desiredCapabilities.browserName);

    browser
      .execute(() => { localStorage.clear() }, {})
      .refresh()
  },
  'User can\'t register on taken email': (browser) => {
    browser
      .url(url.sign_up)
      .setValue('#signUpEmail', user.login)
      .setValue('#password', user.password)
      .click('.MaterialForm-Actions button')
      .waitForElementPresent('.FormMessage-error')
      .assert.containsText('.FormMessage-error', 'E-mail has already been taken.')
  },
  'User can register': (browser) => {
    browser
      .clearValue('#signUpEmail')
      .setValue('#signUpEmail', `test-${+new Date()}@readma.com`)
      .click('.MaterialForm-Actions button')
      .waitForElementPresent('.FormMessage-notice')
      .assert.containsText('.FormMessage-notice', 'Thank you! Please check your email box for a notice from us! See you soon!')
      .end()
  },
  'User is redirected to home article if not logged in': (browser) => {
    browser
      .url(url.root)
      .assert.urlContains('home')
      .end();
  },
  'Unlogged user is redirected to login page if tries to access protected page': (browser) => {
    browser
      .url(url.profile)
      .assert.urlContains('login')
  },
  'User can login': (browser) => {
    browser
      .setValue('#email', user.login)
      .setValue('#password', user.password)
      .click('.MaterialForm-SubmitButton')
      .waitForAnimation()
      .assert.urlContains('profile')
  },
  'User profile has chart and articles': (browser) => {
    browser
      .waitForElementPresent('.Appbar')
      .assert.containsText('.Appbar h3', `My Profile - ${user.login}`)
      .assert.visible('#learning-progress-chart')
      .assert.elementsCount('.Articles-List .ArticleLink', 4)
  },
  'User can logout': (browser) => {
    browser
      .click($.toggleLeftNavButton)
      .click($.signOutButton)
      .waitForElementPresent('.FormMessage-info')
      .assert.containsText('.FormMessage-info', 'You are now logged out.')
  },
  'User is redirected to login page after logout': (browser) => {
    browser
      .assert.urlContains('login')
  },
  'User can login after logout': (browser) => {
    browser
      .setValue('#email', user.login)
      .setValue('#password', user.password)
      .click('.MaterialForm-SubmitButton')
      .waitForAnimation()
      .assert.urlContains('profile')
      .end()
  },
  'User can\'t remind password of non existent email': (browser) => {
    browser
      .url(url.forgot_password)
      .setValue('#email', `test-${+new Date()}@readma.com`)
      .click('.MaterialForm-SubmitButton')
      .waitForElementPresent('.FormMessage-error')
      .assert.containsText('.FormMessage-error', 'Email you entered does not exist in our database.')
  },
  'User can remind forgotten password': (browser) => {
    browser
      .clearValue('#email')
      .setValue('#email', user.login)
      .click('.MaterialForm-SubmitButton')
      .waitForElementPresent('.FormMessage-notice')
      .waitForElementPresent('.FormMessage-info')
      .assert.containsText('.FormMessage-notice', 'Further instructions will be sent to your email within 5 minutes.')
      .assert.containsText('.FormMessage-info', 'If you don\'t receive email from us in couple minutes, please try again.')
      .end();
  },
};
