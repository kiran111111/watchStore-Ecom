// This is a file that has the axios connections to the backend
// Here the frontend will talk to the backend

import axios from 'axios';

const API_URL = 'http://localhost:5000/';

export async function registerUser(user){
 return await axios.post('http://localhost:5000/register',user)
}


export function loginUser(user){
const data =   axios.post('http://localhost:5000/login',user);
return data;
} 


export default {registerUser,loginUser};