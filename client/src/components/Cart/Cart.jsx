import React,{useEffect,useState} from 'react';
import NavBar from "../Navbar/Navbar";
import {Button} from "react-bootstrap";
import { Link } from 'react-router-dom';
import styles from "./Cart.module.css";
// redux library
import {fetchCurrentUser,fetchProducts,deleteFromCart,fetchCartItems} from "../redux/actions/productActions";
import {useDispatch,connect} from "react-redux";
import axios from 'axios';



function Cart(props) {

  console.log(props)

  const dispatch = useDispatch();

  // Fro getting the current user and 
  useEffect(()=>{
    fetchAll()
  },[])


  const fetchAll = async() =>{
     dispatch(fetchProducts())
     dispatch(fetchCurrentUser())
     dispatch(fetchCartItems())
  }



  //get the latest new products when you delete a product
  const handleDeleteFromCart = async (id)=>{ 
    console.log("action triggered")
    console.log("product id :"+id)
    props.deleteFromCart(id)
    dispatch(fetchCurrentUser())
    dispatch(fetchProducts())
    console.log("deleted from cart")
    window.flash('Product deleted from Cart', 'success')
  }

  
  let sum =0;
  if(props.items.length){
    props.items.map(item =>{
      sum = sum  + item.quantity * item.product.price
    })
  }
  


  
  //to add the quantity
  const handleAddQuantity = (id)=>{
      props.addQuantity(id);
  }
  //to substruct from the quantity
  const handleSubtractQuantity = (id)=>{
      props.subtractQuantity(id);
  }


 return (
  <div>
     <NavBar />
        <div className={styles.wrapper}>

          <div className={styles.container}>

           {props.items.length ? 
             <div>
              {props.items.map((item,i)=>(
                <div className={styles.items} key={i}>
                  <div className={styles.item}>
                    <img className={styles.image} src={(`${item.product.image}`)} alt="watch" />
                  </div>
                  <div className={styles.details}>
                    <p className={styles.name}>{item.product.name}</p>
                    <p className={styles.price}>${item.product.price}.00 x {item.quantity}</p>
                    {/* <p><span>Quantity : </span> <input  type="number" min="1" max="20"></input></p> */}
                    <Button 
                      variant="secondary" 
                      className={styles.delete}
                      onClick={()=>{handleDeleteFromCart(item.product._id)}}
                    >x</Button>
                  </div>
                </div>
                ))}
             </div>
             : 
            <div className={styles.empty__container}>
              <p>No products in your cart. Keep Shopping!</p>
              <Button variant="primary" className={styles.checkout__btn}>
                  <Link 
                    className={styles.link} 
                    to={{pathname: `/`}} 
                  >View Products
                  </Link>
              </Button>
            </div>
            }

            

              <div className={styles.checkout__container}>
               <p>Subtotal : $
                  {sum}.00
               </p>
               <Button 
                  // disabled="true" 
                  variant="info" 
                  className={styles.checkout__btn}>
                 Checkout
               </Button>
              </div>

          </div>

      </div>
  </div>
 )
}


const mapStateToProps = (state)=>{
  return{
    items : state.auth.cartItemsContent,
    total : state.auth.total
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    deleteFromCart : (id)=>{dispatch(deleteFromCart(id))} 
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Cart)
