import React,{useState,useEffect} from 'react';
import NavBar from "../../../Navbar/Navbar";
import styles from "../Admin.module.css";
import Products from "../../../../Products";
import {Redirect} from "react-router-dom";
import {Spinner} from "react-bootstrap";
import Admin from "../Admin";
import {mainHttp as axios} from "../../../../Axios/axios"



// TODO : THERE IS A BIG BUG IN HERE
// TODO : WHEN THE EDIT PAGE RELOADS IT MESSES UP EVERYTHING:
// ! SOLVE THIS ISSUE WHEN YOU GET TIME -------


import {editInventoryBegin,
       editInventorySuccess,
       fetchProducts,
         } 
       from "../../../redux/actions/productActions";
import {useDispatch,connect} from "react-redux";


function Edit(props) {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchProducts())
  },[])

  const editProps = props.match.params;

  const toEditProduct = props.productToBeEdited;
  console.log(toEditProduct)
  const [editProduct,setEditProduct] = useState(toEditProduct);
  const [state,setState]  = useState({edited : false});

  console.log(editProduct)
  // const {_id,name,price,image,description} = editProduct;
  const [file,setFile] = useState('')
  console.log(file)
 
  

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
    formData.append("image", file.name);


    dispatch(editInventoryBegin());
    await axios
    .post(`/edit/${editProduct._id}`, formData ,{
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    })
      .then(res => {
        setState({edited : true})
        dispatch(editInventorySuccess());
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
   
   

    {!editProduct ?  <div><Spinner animation="border" variant="info" /> </div> 
      :

     <form  
     onSubmit={(e) => {
      handleSubmitProduct(editProduct._id,e
      )}}
     className={styles.form}  >

      <label className={styles.label}>Name</label>
       <input
         className={styles.inputField}
         name='name'
         placeholder='Name.'
         value={editProduct.name}
         onChange={handleChange}
         /><br/>

      <label className={styles.label}>Price</label>
       <input
         className={styles.inputField}
         type="Number"
         name='price'
         placeholder='Price..'
         value={editProduct.price}
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
         value={editProduct.description}
         onChange={handleChange}
         /><br/>  
     
       <input className={styles.button} 
          type='submit' 
          
        />
    
      </form>
     }

    </div>

  </div>
 )
}





const mapStateToProps = (state,props) => ({
      productToBeEdited : state.products.items.find(p => p._id == props.match.params.id ? p : ''),
      loading : state.products.loading,
      error : state.products.error,
      editLoading : state.inventory.loading
});


const mapDispatchToProps = dispatch => {
  return{
    fetchProducts : ()=> {dispatch(fetchProducts)}
   } 
};

export default connect(mapStateToProps,mapDispatchToProps)(Edit);



// ! Error: there was a error happening here
// ! that the page was loading when the form submitted and losing all 
// !set props. So you always need the e.preventDefault() to not refresh 
// !form while submitting and hence not rerendering the component--:)