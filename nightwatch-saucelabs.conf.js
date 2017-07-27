require('dotenv').config();
const SCREENSHOT_PATH = './e2e/screenshots/';
const BINPATH = './node_modules/.bin/';

// we use a nightwatch.conf.js file so we can include comments and helper functions
module.exports = {
  src_folders: ['e2e/index.js'],
  output_folder: './reports',
  selenium: {
    start_process: false,
    server_path: './node_modules/.bin/selenium.jar',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': './node_modules/.bin/chromedriver'
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
        browserName: 'chrome'
      }
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        platform: 'Windows 10'
      }
    },
    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        platform: 'Windows 10'
      }
    },
    edge: {
      // TODO: Investigate why fails on some simple tasks or just remove m$hit
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
  custom_commands_path: './node_modules/nightwatch-commands/commands',
  custom_assertions_path: './node_modules/nightwatch-commands/assertions'
};
