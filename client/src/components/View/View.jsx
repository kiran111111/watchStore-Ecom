import React,{useState} from 'react';
import {Button,Spinner} from "react-bootstrap";
import { Link } from 'react-router-dom';
import NavBar from "../Navbar/Navbar";
import styles from "./View.module.css";

import {addItemToCart,fetchCurrentUser} from "../redux/actions/productActions";
import {connect,useDispatch} from "react-redux";


const url = `/uploads/`;

function View(props) {

  const {products} = props; 
  const viewedId = props.match.params.id; 
  const product = products.find(p => p._id == viewedId);

  const dispatch = useDispatch();

  const [qty, setQty] = useState('')

   //onChange event handler for the inputs ------------------------------------------------
  function handleChange(evt) {
    const value = evt.target.value;
    setQty(value)
  }

  const handleAddToCart = async (id,qty)=>{ 
    props.addItemToCart(id,qty)
    await dispatch(fetchCurrentUser())
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
              <img src={(`${url}${product.file}`)} alt="watch"/>
            </div>
            <div className={styles.view__details}>
              <p>{product.name} </p>
              <p>${product.price} </p>
              <div>
                 <p><span>Quantity : </span> <input onChange={(e) => handleChange(e)} type="number" min="1" max="20"></input></p>

               {props.addLoading ? 
                  <div><Spinner animation="border" variant="info" /> </div>
                :
                
               <>
               <div>
                {props.user.name ?
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
                 :
                  <Button
                    className={styles.button}
                    type="button" 
                    variant="danger"
                   >
                    <Link 
                      className={styles.link} 
                      to={{pathname: `/login`}} 
                    >Login To add Product
                    </Link>
                  </Button>
                } 
                </div>
              </>
              }

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
  error: state.products.error,
  user : state.auth.currentUser,
  addLoading : state.auth.loading
});

const mapDispatchToProps = dispatch => {
  return{
    addItemToCart: (id,qty)=>{dispatch(addItemToCart(id,qty))} 
   } 
};

export default connect(mapStateToProps,mapDispatchToProps)(View);