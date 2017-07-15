require('dotenv').config();

const host = process.env.READMA_URL || 'http://localhost:8080';

module.exports = {
  root: `${host}`,
  login: `${host}/#/login`,
  home: `${host}/#/home`,
  sign_up: `${host}/#/sign_up`,
  profile: `${host}/#/profile`,
  forgot_password: `${host}/#/forgot_password`,
}
