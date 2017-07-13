require('dotenv').config(); // optionally store your Evironment Variables in .env
var host = process.env.READMA_URL || 'http://localhost:8080';

module.exports = {
  'Can login': function(browser) {
    browser
      .url(host)
      .waitForElementVisible('body')
      .assert.title('ReadMa - Your learning assistant')
      .click('.Appbar > button')
      .waitForAnimation(400, function() {
        browser
          .assert.elementsVisible('#loginButton')
      })
      .click('#loginButton')
      .setValue('#email', 'help@readma.com')
      .setValue('#password', 'help@readma.com')
      .submitForm('#loginForm')
      .waitForAnimation(1000, function() {
        browser
          .assert.elementsVisible('#my-profile-container')
          .assert.elementsVisible('#learning-progress-chart')
      })
      .end();
  }
};
