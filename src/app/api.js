import axios from 'axios';
import store from './store';

let instance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
  headers: {}
});

function getAuthToken() {
  return store.getState().auth.auth_token;
}

instance.interceptors.request.use(function(config) {
  if (!config.url.match(/api\/login/)) {
    config.params = Object.assign({}, config.params, { auth_token: getAuthToken() });
  }

  return config;
});


export default instance;
