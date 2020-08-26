import React,{useEffect,useState} from 'react';
import NavBar from "../Navbar/Navbar";
import {Spinner} from "react-bootstrap";
import {Button} from "react-bootstrap";
import { Link } from 'react-router-dom';
import styles from "./Cart.module.css";
// redux library
import {fetchCurrentUser,fetchProducts,deleteFromCart,fetchCartItems} from "../redux/actions/productActions";
import {useDispatch,connect} from "react-redux";
import {mainHttp as axios} from "../../Axios/axios"
// stripe set up
import StripeCheckout from 'react-stripe-checkout';


const url = `/uploads/`;

function Cart(props) {

  const dispatch = useDispatch();

  

  // For getting the current user and 
  useEffect(()=>{
    if(props.currentUser.name){
     fetchAll()
    }
  },[])


  const fetchAll = async() =>{
     dispatch(fetchCurrentUser())
     dispatch(fetchCartItems())
  }



  //get the latest new products when you delete a product
  const handleDeleteFromCart = async (id)=>{ 
    props.deleteFromCart(id)
    window.flash('Product deleted from Cart', 'success')
  }

  
  let sum =0;
  if(props.items.length){
    props.items.map(item =>{
      sum = sum  + item.quantity * item.product.price
    })
  }
  
  const handleCheckout = (token,addressess) =>{
     console.log({token,addressess})
  }

 return (
  <div>
     <NavBar />
        <div className={styles.wrapper}>

          <div className={styles.viewcart__container}>

            {/* test code */}

          {/* wait for deleting a item */}
              {props.deleting ? 
                 <div><Spinner animation="border" variant="info" /> </div>  
                 : 

                //  wait for loading
              <> 
              {props.loading ? 
                  <div><Spinner animation="border" variant="info" /> </div>
               : 
               
               <>
              {/* wait for the cart items */}
               {props.itemsLoading ? 
                  <div><Spinner animation="border" variant="info" /> </div>
                :  
                  <>
                   {/* 'loaded'  */}
                   <div>
                     {props.currentUser.name ? 
                      <>
                        {/* "user exists... lets check if you have items  in the cart"  */}

                       <div className={styles.container}>
                        {props.items.length ? 
                          // 'items are there see here'

                          <div>
                          {props.items.map((item,i)=>(
                            <div className={styles.items} key={i}>
                              <div className={styles.item}>
                                <img className={styles.image} src={(`${url}${item.product.file}`)} alt="watch" />
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

                          // 'No items'
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
        
          {/* we will have to convert price into cents for transactions */}

             <StripeCheckout
                name="Watch Store"
                amount={sum*100}
                // image="/static/Logo.ico"
                currency="USD"
                shippingAddress={true}
                billingAddress={true}
                zipCode={true}
                token={handleCheckout}
                trigger="onClick"
                stripeKey="pk_test_51H1eMzIaYoV5EvnwBmucxBwSgKbSTbM7NblNG7Q4k5sxvUcYZvJHWYHV7Vzj0oixM8hnwhstccdGqUcywOfMz5w500O6DGHZ4s"
              >
                <Button
                  icon="cart"
                  color="teal"
                  floated="right"
                  content="Checkout"
                  // disabled={isCartEmpty || success}
                >Checkout</Button>
               </StripeCheckout>
              </div>

              
                        
                </div>
                  </>
                     :  
                  //  " user does not exists.. login to view"
                    <Button 
                    variant="primary" 
                      className={styles.viewcart_btn}
                    >
                      <Link 
                        className={styles.link} 
                        to={{pathname: `/login`}} 
                      >Please Login to view your cart
                      </Link>
                    </Button>
                    }
                  </div>
                  
              </>
              }

             </>  
             }

            </>
            }

        {/* test code ends */}
         </div>
      </div>
  </div>
 )
}


const mapStateToProps = (state)=>{
  return{
    items : state.auth.cartItemsContent,
    total : state.auth.total,
    currentUser : state.auth.currentUser,
    loading: state.auth.loading,
    itemsLoading : state.auth.cartItemsLoading,
    deleting : state.auth.deleting
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    deleteFromCart : (id)=>{dispatch(deleteFromCart(id))} 
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Cart)
