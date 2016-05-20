import axios from 'axios';
import Config from 'Config';
import store from './store';
import { processFinished, processStarted } from './actions';

var instance = axios.create({
  baseURL: Config.apiUrl,
  timeout: 10000,
  headers: {}
});

function getAuthToken() {
  return store.getState().auth.auth_token;
};

instance.interceptors.response.use(function (config) {
  store.dispatch(processFinished());
  return config;
}, function (error) {
  store.dispatch(processFinished());
  return Promise.reject(error);
});

instance.interceptors.request.use(function (config) {

  if (!config.url.match(/api\/login/)) {
    config.params = Object.assign({}, config.params, {auth_token: getAuthToken()});
  }
  store.dispatch(processStarted());
  return config;

}, function (error) {
  return Promise.reject(error);
});

export default instance;
