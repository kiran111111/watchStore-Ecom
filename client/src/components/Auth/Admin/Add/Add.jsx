import React,{useState} from 'react';
import NavBar from "../../../Navbar/Navbar";
import styles from "../Admin.module.css";
import Products from "../../../../Products";
import {Redirect} from "react-router-dom";
import {Spinner} from "react-bootstrap";
import Admin from "../Admin";
import Shop from "../../../Shop/Shop";
import {mainHttp as axios} from "../../../../Axios/axios";



import {addInventoryToStore,addInventorySuccess,addInventoryBegin} from "../../../redux/actions/productActions";
import {useDispatch,connect} from "react-redux";



const initialState = {
  name:'',
  price:'',
  imageLink:'',
  description:''
}


function Add(props) {

  const dispatch = useDispatch();

  const [product,setProduct] = useState('');
  const [state,setState]  = useState({added : false});


// method for creating a new product
// I will have to put onchange event handler on all the input field
// so that the state of a new product is formed and can be send 
// to the backend----

// 1 : Make the function for the input change event
    // handle input change event
    function handleChange(evt) {
      const value = evt.target.value;
    
      setProduct({...product,
        [evt.target.name]: value
      });
    }




// handle the product submission
  const handleSubmitProduct = async(event) =>{
    event.preventDefault();
  console.log("submit started")
    const formData = new FormData();
    await formData.append("name", product.name);
    await formData.append("price", product.price);
    await formData.append("description", product.description);
    await formData.append("imageLink", product.imageLink);



    
    dispatch(addInventoryBegin()) 

    await axios
    .post(`/add/`, {
        "name": product.name,
        "price": product.price,
        "description": product.description,
        "imageLink": product.imageLink
      }
     )
      .then(res => {
        setState({added : true}) ;
        dispatch(addInventorySuccess()) 
        window.flash('Product added', 'success') 
      })

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

    {props.loading ? <div><Spinner animation="border" variant="info" /> </div> 
     :

     <form
      // action="/add"
       method="post"  onSubmit={handleSubmitProduct} className={styles.form} >

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
         type="text" 
         className={styles.inputField}
         name="imageLink"
         placeholder='Upload your image here..'
         value={product.imageLink}
         onChange={(e) => handleChange(e)}
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
     }

    </div>

  </div>
 )
}


const mapStateToProps = state => ({
  loading: state.inventory.loading
});

export default connect(mapStateToProps,null)(Add);


// todo:--------*****************************
// it should recive all the poduts and when added products should update
// and the state shoulf change and the admin page should rerender then....