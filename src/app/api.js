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

instance.interceptors.request.use(function (config) {
    config.params = Object.assign({}, config.params, {auth_token: 'secret'});

    return config;
}, function (error) {
    return Promise.reject(error);
});


export default instance;
