import React from 'react';
import {Button} from "react-bootstrap";
import styles from "./Product.module.css";
import {Link} from "react-router-dom";
import ReactTimeAgo from 'react-time-ago'


export default function Product(props) {


 return (
  <div className={styles.product__wrapper}>
     <div className={styles.product__container}>
       <div className={styles.product__image}>
         <Link   to={{pathname: `/product/${props.item._id}`, query: { id: props.item.id }}}>
            <img src={(`${props.item.file}`)} alt="watch"/>
         </Link>
       </div>
       <div className={styles.product__content}>
        <p className={styles.product__desc}>{props.item.name}</p>
        <p className={styles.product__desc}>${props.item.price}</p>
        <p className={styles.product__desc}>
       {/* <p>{props.item.date}</p> */}
          <ReactTimeAgo className={styles.product__date} date={props.item.date}/>
        </p>
        <div className={styles.product__buttons}>
          <p>
           <Button variant="info" className={styles.product__view}>
              <Link className={styles.link}  to={{pathname: `/product/${props.item._id}`, query: { id: props.item._id }}}>View</Link>
           </Button>
          </p>
          {/* <p><Button variant="dark" className={styles.product__add}>Add to Cart</Button></p> */}
        </div>
       </div>
     </div>
  </div>
 )
}









//? Styles for the product
 {/* <div className={styles.product__container}>
      <p>{props.item.name}</p>
      <p>{props.item.price}</p>
      <img src={require(`../../images/${props.item.image}`)}/>
      <Button variant="success">Success</Button>
     </div> */}