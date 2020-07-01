import React,{useState} from 'react';
import NavBar from "../../../Navbar/Navbar";
import styles from "../Admin.module.css";
import Products from "../../../../Products";
import {Redirect} from "react-router-dom";
import Admin from "../Admin";
import Shop from "../../../Shop/Shop";
import axios from "axios";

const initialState = {
  name:'gfg',
  price:'',
  image:'',
  description:''
}


export default function Add() {

  const [product,setProduct] = useState('');
  const [file,setFile] = useState('')
  const [state,setState]  = useState({added : false});

// method for creating a new product
// I will have to put onchange event handler on all the input field
// so that the state of a new product is formed and can be send 
// to the backend----

// 1 : Make the function for the input change event
    // handle input change event
    function handleChange(evt) {
      const value = evt.target.value;
      console.log(evt.target)
    
      setProduct({...product,
        [evt.target.name]: value
      });
    }


    // handle file change
    function handleFileChange(evt){
      console.log(evt.target.files[0].name)
      setFile(evt.target.files[0])
    }


// handle the product submission
  const handleSubmitProduct = async(event) =>{
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("file", file);
    formData.append("image", file.name);

    axios
    .post("http://localhost:5000/add/", formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    })
      .then(res => {
        console.log(res.data)
        setState({added : true}) ; 
      })
      .catch(err => console.error(err));
  }



  // renderRedirect();
  const redirectToShop = () => {
    return <Redirect to='/admin'  render={(props) => <Admin  {...props}  />} />
  }


 return (
  <div>
   <NavBar/>
   <div className={styles.action__container}>
   {(state.added  === true) ? redirectToShop() : ""}
    <h3 className={styles.title}>Add a New  Product</h3>
     <form
      // action="/add"
       method="post" enctype="multipart/form-data" onSubmit={handleSubmitProduct} className={styles.form} >

      <label className={styles.label}>Name</label>
       <input
         className={styles.inputField}
         name='name'
         placeholder='Name.'
         value={product.name}
         onChange={(e) => handleChange(e)}
         /><br/>

      <label className={styles.label}>Price</label>
       <input
         className={styles.inputField}
         type="Number"
         name='price'
         placeholder='Price..'
         value={product.price}
         onChange={(e) => handleChange(e)}
       />
       <br/> 

       <label className={styles.label}>Image</label>
       <input
         type="file" 
         className={styles.inputField}
         name="image"
         accept="image/*"
         placeholder='Upload your image here..'
         value={product.image && product.image}
         onChange={(e) => handleFileChange(e)}
         /><br/>

       <label className={styles.label}>Description</label>
       <textarea
         className={styles.inputField}
         type='text'
         name='description'
         placeholder='Product details..'
         value={product.description}
         onChange={(e) => handleChange(e)}
         /><br/>  
     
       <input className={styles.button} type='submit' />
    
     </form>
    </div>

  </div>
 )
}


// todo:--------*****************************
// it should recive all the poduts and when added products should update
// and the state shoulf change and the admin page should rerender then....