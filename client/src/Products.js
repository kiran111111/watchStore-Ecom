// This is a file that has the axios connections to the backend
// Here the frontend will talk to the backend

import axios from 'axios';

const API_URL = 'http://localhost:5000/';


// get all the products
async function getAllProducts(){
 const data =  await axios.get(API_URL);
 return data;
}


async function createProduct(product){
 const {data} = await axios.post(`${API_URL}add`, {
   name:product.name,
   price : product.price,
   image:product.image,
   description:product.description
 })
 return data;
}


async function editOldProduct(id,product){
  const {data} =  await axios.post(`${API_URL}edit/${id}`,{
   name:product.name,
   price : product.price,
   image:product.image,
   description:product.description
  });
} 


async function deleteProduct(id) {
 const {data } = await axios.get(`${API_URL}delete/${id}`)
 return data;
}




export default {getAllProducts,createProduct,editOldProduct,deleteProduct};