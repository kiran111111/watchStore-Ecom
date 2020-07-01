import React,{useState} from 'react';
import NavBar from "../../../Navbar/Navbar";
import styles from "../Admin.module.css";
import Products from "../../../../Products";
import {Redirect} from "react-router-dom";
import Admin from "../Admin";
import axios from "axios";

import {connect} from "react-redux";


function Edit(props) {

  const {products} = props; 
  const editProps = props.match.params;

  const toEditProduct = products.find(p => p._id == editProps.id ? p : '')

  const [editProduct,setEditProduct] = useState( editProps && toEditProduct);
  const [state,setState]  = useState({edited : false});

  const {_id,name,price,image,description} = editProduct;
  const [file,setFile] = useState(editProduct.image)

  console.log(file)
  console.log(editProduct)

// Apply an event handler to the input fields
  function handleChange(evt) {
    const value = evt.target.value;
    setEditProduct({...editProduct,
      [evt.target.name]: value
    });
  }


  // handle file change
  function handleFileChange(evt){
      console.log(evt.target.files[0].name)
      setFile(evt.target.files[0])
    }


  // handle the product submission
  const handleSubmitProduct = async(id,event) =>{
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", editProduct.name);
    formData.append("price", editProduct.price);
    formData.append("description", editProduct.description);
    formData.append("file", file);
    // formData.append("image", file.name);

    axios
    .post(`http://localhost:5000/edit/${id}`, formData ,{
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    })
      .then(res => {
        setState({edited : true})
      })
      .catch(err => console.error(err));
  }


  // renderRedirect();
  const redirectToAdmin = () => {
    return <Redirect to='/admin'  render={(props) => <Admin  {...props}  />} />
    //! we can either user the history or the redirect to redirect pages on a new link when
    //! some action happens
  }



 return (
  <div>
   <NavBar />

   <div className={styles.action__container}>
    {(state.edited  === true) ? redirectToAdmin() : ""}
    <h3 className={styles.title}>Edit your Product</h3>
     <form  
     onSubmit={(e) => {
      handleSubmitProduct(_id,e
      )}}
     className={styles.form}  >

      <label className={styles.label}>Name</label>
       <input
         className={styles.inputField}
         name='name'
         placeholder='Name.'
         value={name}
         onChange={handleChange}
         /><br/>

      <label className={styles.label}>Price</label>
       <input
         className={styles.inputField}
         type="Number"
         name='price'
         placeholder='Price..'
         value={price}
         onChange={handleChange}
       />
       <br/> 

       <label className={styles.label}>Image</label>
       <input
         className={styles.inputField}
         type="file" 
         name="image"
         placeholder='Upload your image here..'
         value=''
         onChange={(e) => handleFileChange(e)}
         /><br/>

       <label className={styles.label}>Description</label>
       <textarea
         className={styles.inputField}
         type='text'
         name='description'
         placeholder='Product details..'
         value={description}
         onChange={handleChange}
         /><br/>  
     
       <input className={styles.button} 
          type='submit' 
          
        />
    
     </form>
    </div>

  </div>
 )
}


const mapStateToProps = state => ({
  products: state.products.items,
  loading: state.products.loading,
  error: state.products.error
});

export default connect(mapStateToProps)(Edit);



// ! Error: there was a error happening here
// ! that the page was loading when the form submitted and losing all 
// !set props. So you always need the e.preventDefault() to not refresh 
// !form while submitting and hence not rerendering the component--:)