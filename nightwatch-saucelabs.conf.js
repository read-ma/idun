require('dotenv').config();
const SCREENSHOT_PATH = "./e2e/screenshots/";
const BINPATH = './node_modules/.bin/';

// we use a nightwatch.conf.js file so we can include comments and helper functions
module.exports = {
  src_folders: [
    "e2e/index.js"
  ],
  output_folder: "./reports",
  selenium: {
    start_process: false,
    server_path: "./node_modules/.bin/selenium.jar",
    port: 4444,
    cli_args: {
      "webdriver.chrome.driver" : "./node_modules/.bin/chromedriver",
    }
  },
  test_settings: {
    default: {
      launch_url: 'http://ondemand.saucelabs.com:80',
      selenium_port: 80,
      selenium_host: 'ondemand.saucelabs.com',
      silent: true,
      username: process.env.SAUCE_USERNAME,
      access_key: process.env.SAUCE_ACCESS_KEY,
      screenshots: {
        enabled: true,
        on_failure: true,
        on_error: true,
        path: SCREENSHOT_PATH
      },
      globals: {
        waitForConditionTimeout: 10000
      },
      desiredCapabilities: {
        browserName: "chrome"
      }
    },
    chrome: {
      desiredCapabilities: {
        browserName: "chrome",
        platform: 'Windows 10'
      }
    },
    firefox: {
      desiredCapabilities : {
        browserName : "firefox",
        platform: 'Windows 10'
      }
    },
    edge: { // TODO: Investigate why fails on some simple tasks or just remove m$hit
      desiredCapabilities: {
        browserName: 'microsoftedge',
        platform: 'Windows 10'
      }
    },
    safari: {
      desiredCapabilities: {
        browserName: 'safari',
        version: '10',
        platform: 'OS X 10.11'
      }
    }
  },
  custom_commands_path: "./node_modules/nightwatch-commands/commands",
  custom_assertions_path: "./node_modules/nightwatch-commands/assertions"
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