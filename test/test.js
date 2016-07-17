/* global casper */

const pageTitle = 'ReadMa - Your learning assistant';

casper.test.begin('Login page', 1, function (test) {
  casper.start('http://beta.readma.com')
    .then(function () {
      test.assertTitle(pageTitle, 'Page has correct title');
    })
    .run(function () {
      test.done();
    });
});
