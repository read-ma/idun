/* eslint no-console:0 */
const https = require('https');

module.exports = function sauceLabsReporter(callback) {
  const currentTest = this.client.currentTest;
  const username = this.client.options.username;
  const sessionId = this.client.capabilities['webdriver.remote.sessionid'];
  const accessKey = this.client.options.accessKey;

  if (!this.client.launch_url.match(/saucelabs/)) {
    return callback();
  }

  if (!username || !accessKey || !sessionId) {
    console.log('No username, accessKey or sessionId');
    return callback();
  }

  const passed = currentTest.results.passed === currentTest.results.tests;

  const data = JSON.stringify({ passed });

  function responseCallback(res) {
    res.setEncoding('utf8');
    // console.log('Response: ', res.statusCode, JSON.stringify(res.headers));
    res.on('data', function onData(chunk) {
      console.log('Video from test %s', chunk.video_url);
    });
    res.on('end', function onEnd() {
      callback();
    });
  }

  try {
    const req = https.request({
      hostname: 'saucelabs.com',
      path: `/rest/v1/${username}/jobs/${sessionId}`,
      method: 'PUT',
      auth: `${username}:${accessKey}`,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    }, responseCallback);

    req.on('error', function onError(e) {
      console.log('problem with request: ' + e.message);
    });
    req.write(data);
    req.end();
  } catch (error) {
    console.log('SauceLabsReporter: Error:', error);
    callback();
  }
};
