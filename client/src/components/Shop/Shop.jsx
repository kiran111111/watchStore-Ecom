import React from 'react'
import NavBar from "../Navbar/Navbar";
import Product from "../Product/Product"
import styles from "./Shop.module.css";

import {connect} from "react-redux";

function Shop(props) {

 return (
  <div>
    <NavBar />
     <div className={styles.shop__container}>
       {props.products.map((item,i)=>(
         <Product item={item}  key={i}/>
       ))}
     </div>
  </div>
 )
}

const mapStateToProps = state => ({
  products: state.products.items,
  loading: state.products.loading,
  error: state.products.error
});

export default connect(mapStateToProps)(Shop);