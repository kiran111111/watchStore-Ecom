import React from 'react';
import {Button} from "react-bootstrap";
import styles from "./Product.module.css";
import {Link} from "react-router-dom";
import ReactTimeAgo from 'react-time-ago'
import { mainHttp as axios} from "../../Axios/axios"

const url =  `/uploads/`;


// const url =  `${axios.baseURL}/uploads/`;

console.log(axios.baseURL)

export default function Product(props) {

 return (
  <div className={styles.product__wrapper}>
     <div className={styles.product__container}>
       <div className={styles.product__image}>
         <Link   to={{pathname: `/product/${props.item._id}`, query: { id: props.item.id }}}>
            <img src={props.item.imageLink} alt="watch"/>
         </Link>
       </div>
       <div className={styles.product__content}>
        <p className={styles.product__desc}>{props.item.name}</p>
        <p className={styles.product__desc}>${props.item.price}</p>
        <p className={styles.product__desc}>
          <ReactTimeAgo className={styles.product__date} date={props.item.date}/>
        </p>
        <div className={styles.product__buttons}>
          <p>
           <Button variant="info" className={styles.product__view}>
              <Link className={styles.link}  to={{pathname: `/product/${props.item._id}`, query: { id: props.item._id }}}>View</Link>
           </Button>
          </p>
        </div>
       </div>
     </div>
  </div>
 )
}

