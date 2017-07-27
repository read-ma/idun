const SCREENSHOT_PATH = './e2e/screenshots/';
const BINPATH = './node_modules/.bin/';

module.exports = {
  src_folders: ['e2e/index.js'],
  output_folder: './test/reports',
  selenium: {
    start_process: true,
    server_path: './node_modules/.bin/selenium.jar',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': './node_modules/.bin/chromedriver'
    }
  },
  test_settings: {
    default: {
      launch_url: 'http://localhost',
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      screenshots: {
        enabled: true,
        on_failure: true,
        on_error: true,
        path: SCREENSHOT_PATH
      },
      globals: { waitForConditionTimeout: 5000 },
      desiredCapabilities: { browserName: 'chrome' }
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome'
      }
    }
  },
  custom_commands_path: './node_modules/nightwatch-commands/commands',
  custom_assertions_path: './node_modules/nightwatch-commands/assertions'
};

require('fs').stat(BINPATH + 'selenium.jar', (err, stat) => {
  // got it?
  if (err || !stat || stat.size < 1) {
    require('selenium-download').ensure(BINPATH, error => {
      if (error) throw new Error(error); // no point continuing so exit!
      console.log('✔ Selenium & Chromedriver downloaded to:', BINPATH);
    });
  }
});

const padLeft = count => {
  return count < 10 ? '0' + count : count.toString();
};

var FILECOUNT = 0; // "global" screenshot file count
const imgpath = browser => {
  var a = browser.options.desiredCapabilities;
  var meta = [a.platform];
  meta.push(a.browserName ? a.browserName : 'any');
  meta.push(a.version ? a.version : 'any');
  meta.push(a.name); // this is the test filename so always exists.
  var metadata = meta.join('~').toLowerCase().replace(/ /g, '');
  return SCREENSHOT_PATH + metadata + '_' + padLeft(FILECOUNT++) + '_';
};

module.exports.imgpath = imgpath;
module.exports.SCREENSHOT_PATH = SCREENSHOT_PATH;
