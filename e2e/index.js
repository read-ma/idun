/*
  TODO:

    Create page_objects to increase readability and maintainability
    Test removal of an account (need endpoint)
*/

const url = require('./lib/url');
const sauceLabsReporter = require('./lib/sauceLabsReporter');
const $ = require('./lib/elements');

const user = {
  login: process.env.TEST_LOGIN,
  password: process.env.TEST_PASSWORD
};

module.exports = {
  before: browser => {
    console.log('Running tests @ :', browser.options.desiredCapabilities.browserName);

    this.tempUserEmail = `test-${+new Date()}@readma.eu`;
    this.nonExistentEmail = `${+new Date()}@readma.eu`;

    browser
      .execute(() => {
        localStorage.clear();
      }, {})
      .refresh();
  },
  tearDown: sauceLabsReporter,
  "User can't register on taken email": browser => {
    browser
      .url(url.sign_up)
      .setValue($.signupEmailField, user.login)
      .setValue($.passwordField, user.password)
      .click($.defaultSubmitButton)
      .waitForElementPresent($.errorFlashMessage)
      .assert.containsText($.errorFlashMessage, 'E-mail has already been taken.');
  },
  'User can register': browser => {
    browser
      .clearValue($.signupEmailField)
      .setValue($.signupEmailField, this.tempUserEmail)
      .click($.defaultSubmitButton)
      .waitForElementPresent($.noticeFlashMessage)
      .assert.containsText(
        $.noticeFlashMessage,
        'Thank you! Please check your email box for a notice from us! See you soon!'
      )
      .end();
  },
  'User is redirected to home article if not logged in': browser => {
    browser.url(url.root).assert.urlContains('home').end();
  },
  'Unlogged user is redirected to login page if tries to access protected page': browser => {
    browser.url(url.profile).assert.urlContains('login');
  },
  'User can login': browser => {
    browser
      .setValue($.emailField, user.login)
      .setValue($.passwordField, user.password)
      .click($.defaultSubmitButton)
      .waitForAnimation()
      .assert.urlContains('profile');
  },
  'User profile has chart and articles': browser => {
    browser
      .waitForElementPresent('.Appbar')
      .assert.containsText('.Appbar h3', `My Profile - ${user.login}`)
      .assert.visible('#learning-progress-chart')
      .assert.elementsCount('.Articles-List .ArticleLink', 4);
  },
  'User can logout': browser => {
    browser
      .click($.toggleLeftNavButton)
      .click($.signOutButton)
      .waitForElementPresent($.infoFlashMessage)
      .assert.containsText($.infoFlashMessage, 'You are now logged out.');
  },
  'User is redirected to login page after logout': browser => {
    browser.assert.urlContains('login');
  },
  'User can login after logout': browser => {
    browser
      .setValue($.emailField, user.login)
      .setValue($.passwordField, user.password)
      .click($.defaultSubmitButton)
      .waitForAnimation()
      .assert.urlContains('profile')
      .end();
  },
  "User can't remind password of non existent email": browser => {
    browser
      .url(url.forgot_password)
      .setValue($.emailField, this.nonExistentEmail)
      .click($.defaultSubmitButton)
      .waitForElementPresent($.errorFlashMessage)
      .assert.containsText(
        $.errorFlashMessage,
        'Email you entered does not exist in our database.'
      );
  },
  'User can remind forgotten password': browser => {
    browser
      .clearValue($.emailField)
      .setValue($.emailField, user.login)
      .click($.defaultSubmitButton)
      .waitForElementPresent($.noticeFlashMessage)
      .waitForElementPresent($.infoFlashMessage)
      .assert.containsText(
        $.noticeFlashMessage,
        'Further instructions will be sent to your email within 5 minutes.'
      )
      .assert.containsText(
        $.infoFlashMessage,
        "If you don't receive email from us in couple minutes, please try again."
      )
      .end();
  }
};
