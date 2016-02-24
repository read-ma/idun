import axios from 'axios';
import Config from  'Config';
import store from './store';

var instance = axios.create({
    baseURL: Config.apiUrl,
    timeout: 10000,
    headers: {
        'X-Custom-Header': 'foobar'
    }
});

instance.interceptors.response.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.request.use(function (config) {

    if (!config.url.match(/api\/login/)) {
        let auth_token = store.getState().auth.auth_token;

        config.params = Object.assign({}, config.params, {auth_token: auth_token});
    }

    return config;


}, function (error) {
    return Promise.reject(error);
});

export default instance;
