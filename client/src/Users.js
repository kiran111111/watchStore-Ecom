// This is a file that has the axios connections to the backend
// Here the frontend will talk to the backend

import {mainHttp as axios} from "./Axios/axios";

const API_URL = 'http://localhost:5000/';

export async function registerUser(user){
 return await axios.post('/register',user)
}


export function loginUser(user){
const data =   axios.post('/login',user);
return data;
} 


export default {registerUser,loginUser};