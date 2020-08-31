import * as axios from 'axios';


const mainHttp = axios.create({
    baseURL: '/api',
    timeout: 10000,
    withCredentials: true
});

export { mainHttp };