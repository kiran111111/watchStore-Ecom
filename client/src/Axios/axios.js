import * as axios from 'axios';


const mainHttp = axios.create({
    baseURL: '/api',
    timeout: 5000,
    withCredentials: true
});

export { mainHttp };