import React,{useEffect,useState} from 'react';
import {Button} from "react-bootstrap";
import NavBar from "../Navbar/Navbar";
import styles from "./View.module.css";
import {FlashMessage} from 'react-flash-message'
// redux librar
import {addItemToCart,fetchCurrentUser} from "../redux/actions/productActions";
import {connect,useDispatch} from "react-redux";




function View(props) {

  const {products} = props; 
  const viewedId = props.match.params.id; 
  const product = products.find(p => p._id == viewedId);

  // const {_id,name,description,price,image} = product;
  const dispatch = useDispatch();

  console.log(props)


  const [qty, setQty] = useState('')


   //onChange event handler for the inputs ------------------------------------------------
  function handleChange(evt) {
    const value = evt.target.value;
    setQty(value)
  }

  console.log(qty)

  const handleAddToCart = async (id,qty)=>{ 
    console.log("action triggered")
    console.log("product id : "+id)
    console.log("qty :"+ qty)
    props.addItemToCart(id,qty)
    await dispatch(fetchCurrentUser())
    console.log("fetched")
    window.flash('Product has been successfully added to Cart', 'success')
  }

  
    return (
      <div className={styles.view__wrapper}>
        { props.loading ? "" :
        <>
         <NavBar />
        
         <div>
         </div>
         <div className={styles.view__container}>
          <div className={styles.view__content}>
            <div className={styles.view__image}>
              <img src={(`${product.file}`)} alt="watch"/>
            </div>
            <div className={styles.view__details}>
              <p>{product.name} </p>
              <p>${product.price} </p>
              <div>
                 <p><span>Quantity : </span> <input onChange={(e) => handleChange(e)} type="number" min="1" max="20"></input></p>
                 <Button
                   className={styles.button}
                   type="button" 
                   variant="danger"
                   onClick={()=>{
                     handleAddToCart(product._id, qty)
                    }}
                  >
                   Add
                 </Button>
               </div>
            </div>
          </div>
          <div className={styles.view__description}>
            <h6>About the Products :</h6>
            <p>{product.description}</p>
            <p>item :</p>
          </div>
        </div>
        </>  
        }
      </div>
     ) 

 
}




const mapStateToProps = state => ({
  products: state.products.items,
  loading: state.products.loading,
  error: state.products.error
});

const mapDispatchToProps = dispatch => {
  return{
    addItemToCart: (id,qty)=>{dispatch(addItemToCart(id,qty))} 
   } 
};

export default connect(mapStateToProps,mapDispatchToProps)(View);