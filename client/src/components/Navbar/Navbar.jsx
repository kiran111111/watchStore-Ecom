import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import {Spinner} from "react-bootstrap";
import styles from "./Navbar.module.css";
import { Navbar,Nav } from 'react-bootstrap'
import 'font-awesome/css/font-awesome.min.css';
import Flash from "../Flash/Flash"

import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';

import { connect } from 'react-redux';
import {logoutUser} from "../redux/actions/productActions";


function NavBar(props) {

  // set the state for the user.. to be supplied in the home page
  const [token,setToken]  = useState('')

   // user variable will be updated when  a new user logs in ..
  // useEffect hook works when its component renders
  useEffect(()=>{
    let token = localStorage.getItem('token')
    setToken(token)
  })


// For calculating the total products in cart
let totalProducts = 0;

if(props.addedItems){
    props.addedItems.map((item)=>{
    totalProducts += item.quantity;
  })
}

  const handleClick = event => {
    event.preventDefault()
    localStorage.setItem('token',"")
    localStorage.setItem('user',"")
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

            {props.loading ?
                 <Spinner animation="border" variant="info" /> 
              : 
            
             <Nav>
              <Nav href="#memes">
                <Link to="/" className={styles.link}>Shop</Link>
              </Nav>
              <Nav href="#memes">
                <Link to="/search" className={styles.link}>Search</Link>
              </Nav>

             { !props.user ? 
               <>
                <Nav href="#memes">
                  <Link to="/login" className={styles.link}>Login</Link>
                </Nav>
                <Nav href="#memes">
                  <Link to="/register" className={styles.link}>Register</Link>
                </Nav>
               </> 
              :
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
            }
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
      addedItems : state.auth.currentUser.cartItems,
      loading : state.auth.loading
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