import axios from 'axios';

var instance = axios.create({
    baseURL: 'http://ms-dashboard.herokuapp.com/api',
    timeout: 1000,
    headers: {
        'X-Custom-Header': 'foobar'
    }
});

export default instance;
