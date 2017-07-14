const SCREENSHOT_PATH = "./e2e/screenshots/";
const BINPATH = './node_modules/.bin/';

// we use a nightwatch.conf.js file so we can include comments and helper functions
module.exports = {
  "src_folders": [
    "e2e/index.js"
  ],
  "output_folder": "./reports",
  "selenium": {
    "start_process": true, // tells nightwatch to start/stop the selenium process
    "server_path": "./node_modules/.bin/selenium.jar",
    "port": 4444,
    "cli_args": {
      "webdriver.chrome.driver" : "./node_modules/.bin/chromedriver",
      // "webdriver.gecko.driver" : "./node_modules/.bin/geckodriver",
    }
  },
  "test_settings": {
    "default": {
      "selenium_port": 80,
      "selenium_host": "ondemand.saucelabs.com:80",
      "launch_url": "http://localhost",
      "screenshots": {
        "enabled": true,
        "path": SCREENSHOT_PATH
      },
      "globals": {
        "waitForConditionTimeout": 5000
      },
      "desiredCapabilities": {
        "browserName": "chrome"
      }
    },
    "chrome": {
      "desiredCapabilities": {
        "browserName": "chrome"
      }
    }
    // "firefox": {
    //   "desiredCapabilities" : {
    //     "browserName" : "firefox"
    //   }
    // },
  },
  "custom_commands_path": "./node_modules/nightwatch-commands/commands",
  "custom_assertions_path": "./node_modules/nightwatch-commands/assertions"
}
/**
 * selenium-download does exactly what it's name suggests;
 * downloads (or updates) the version of Selenium (& chromedriver)
 * on your localhost where it will be used by Nightwatch.
 /the following code checks for the existence of `selenium.jar` before trying to run our tests.
 */

require('fs').stat(BINPATH + 'selenium.jar', function (err, stat) { // got it?
  if (err || !stat || stat.size < 1) {
    require('selenium-download').ensure(BINPATH, function(error) {
      if (error) throw new Error(error); // no point continuing so exit!
      console.log('✔ Selenium & Chromedriver downloaded to:', BINPATH);
    });
  }
});

function padLeft (count) { // theregister.co.uk/2016/03/23/npm_left_pad_chaos/
  return count < 10 ? '0' + count : count.toString();
}

var FILECOUNT = 0; // "global" screenshot file count
/**
 * The default is to save screenshots to the root of your project even though
 * there is a screenshots path in the config object above! ... so we need a
 * function that returns the correct path for storing our screenshots.
 * While we're at it, we are adding some meta-data to the filename, specifically
 * the Platform/Browser where the test was run and the test (file) name.
 */
function imgpath (browser) {
  var a = browser.options.desiredCapabilities;
  var meta = [a.platform];
  meta.push(a.browserName ? a.browserName : 'any');
  meta.push(a.version ? a.version : 'any');
  meta.push(a.name); // this is the test filename so always exists.
  var metadata = meta.join('~').toLowerCase().replace(/ /g, '');
  return SCREENSHOT_PATH + metadata + '_' + padLeft(FILECOUNT++) + '_';
}

module.exports.imgpath = imgpath;
module.exports.SCREENSHOT_PATH = SCREENSHOT_PATH;
