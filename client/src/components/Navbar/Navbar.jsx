import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import styles from "./Navbar.module.css";
import { Navbar,Nav } from 'react-bootstrap'
import 'font-awesome/css/font-awesome.min.css';
import Flash from "../Flash/Flash"

import axios from "axios";


import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';

import { connect ,useDispatch} from 'react-redux';
import {logoutUser,fetchProducts,fetchCartItems} from "../redux/actions/productActions";

// !!!!! PENDING :  MAKE THE (USER STATE) A (REDUX STATE) TONIGHT ****************************
// !!!!!!!!!!!!!!!! IN ALL THE AUTH COMPONENTS THAT USE IT
// !!!!!!!!!!!!!!!! AND SET THE USER PERSONAL CART WITH PRODUCTS TOOO *********************************************************
// !!!!!!!!!!!!!!!! ALSO ADD THE REQUIRED FUCNTIONALITY TO THE CART AND PRODUCTS

// 2) I WANT THE SEARCH BAR TOOO
// 3) I WANT THE VALIDATIONS AND ERRORS TO SHOW UP PROPERLY
// 4) THE PAYMENTS SHOULD PROCESS PROPERLY


function NavBar(props) {

  // console.log(props)
  const dispatch = useDispatch();
  // set the state for the user.. to be supplied in the home page
  const [user, setUser] = useState('')
  const [token,setToken]  = useState('')

  // const newUser = props.user;

   // user variable will be updated when  a new user logs in ..
  // useEffect hook works when its component renders
  useEffect(()=>{
    let newUser = localStorage.getItem('user');
    let token = localStorage.getItem('token')
    // console.log(newUser)
    setUser(newUser)
    setToken(token)
  })

  console.log(props)

// For calculating the total products in cart
let totalProducts = 0;

if(props.addedItems){
    props.addedItems.map((item)=>{
    totalProducts += item.quantity;
  })
  console.log(totalProducts)
}

  const handleClick = event => {
    event.preventDefault()
    // axios.defaults.headers.common['Authorization'] = '';
    localStorage.setItem('token',"")
    localStorage.setItem('user','')
    // dispatch(fetchCartItems());
    // dispatch(fetchProducts())
    props.logoutUser()
    window.flash('User logged out', 'success') 
  }


 return (
  <div>
    <div className="row">
      <div className="col-md-12">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">Watch Store</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              <Nav href="#memes">
                <Link to="/" className={styles.link}>Shop</Link>
              </Nav>
              <Nav href="#memes">
                <Link to="/search" className={styles.link}>Search</Link>
              </Nav>
             { !user ? 
              <>
                <Nav href="#memes">
                  <Link to="/login" className={styles.link}>Login</Link>
                </Nav>
                <Nav href="#memes">
                  <Link to="/register" className={styles.link}>Register</Link>
                </Nav>
              </> :
              <>
                <Nav href="#memes">
                 <Link to="" 
                 onClick={(e)=>
                    handleClick(e)
                   } className={styles.link}>Logout</Link>
                </Nav>
              </>
              }
              <Nav href="#memes">
                <Link to="/cart" className={styles.cart__link}>
                    <IconButton aria-label="cart">
                      <Badge 
                      badgeContent={totalProducts} 
                      color="secondary">
                        <ShoppingCartIcon  color="primary" />
                      </Badge>
                    </IconButton>
                </Link>
              </Nav>
 {/* -------- --- Only shows up with specific password - (admin : admin) ------------------------------*/}
              <Nav href="#memes">
                <Link to="/admin" className={styles.link}>Admin</Link>
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <br />
      </div>
    </div>
    <Flash />
  </div>
 )
}


const mapStateToProps = (state)=>{
  return{
      items: state.products.addedItems,
      user : state.auth.currentUser.name,
      addedItems : state.auth.currentUser.cartItems
  }
}

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
})

export default connect(mapStateToProps,mapDispatchToProps)(NavBar)



// Sample navbar for beginning the mern projects
{/* <div className={styles.navbar}>
<div><Link to="/" className={styles.link}>Shop</Link></div>
<div><Link to="/cart" className={styles.link}>Cart</Link></div>
<div><Link to="/login" className={styles.link}>Login</Link></div>
<div><Link to="/register" className={styles.link}>Register</Link></div>
</div> */}