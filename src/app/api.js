import axios from 'axios';
import Config from  'Config';

var instance = axios.create({
    baseURL: Config.apiUrl,
    timeout: 10000,
    headers: {
        'X-Custom-Header': 'foobar'
    }
});

export default instance;
