/* global casper */
const host = 'http://linguamag.eu'; 

casper.test.begin('Login page', 1, function (test) {
  casper.start(host)
    .then(function () {
      const pageTitle = 'ReadMa - Your learning assistant';
      test.assertTitle(pageTitle, 'Page has correct title');
    })
    .run(function () {
      test.done();
    });
});

casper.test.begin('Home screen', 1, function (test) {
  casper.start(host)
    .then(function () {
      test.assertUrlMatch(/home/);
    })
    .run(function () {
      test.done();
    });
});
