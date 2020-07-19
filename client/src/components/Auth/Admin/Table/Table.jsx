import React,{useState,useEffect} from 'react';
import NavBar from "../../../Navbar/Navbar";
import styles from "../Admin.module.css";
import { Table,Button} from 'react-bootstrap'
import { Link ,Redirect} from "react-router-dom";
import Product from "../../../../Products";
import Admin from "../../Admin/Admin";
import Shop from '../../../Shop/Shop';

export default function Dashboard(props) {

 const products = props.products;
 console.log(products)
 const {_id,name,price,image,description} = props.product;
 const [state,setState]  = useState({deleted : false});

//  useEffect(()=>{
//    setState({deleted:true})
//  })


//  deleting the products------------------------------------------
 const deleteProduct = async (e, id) => {
  e.stopPropagation()
  const products = await Product.deleteProduct(id)
  .then(res=>{
    console.log(res)
  })
}


//  renderRedirect();
const redirectToAdmin = () => {
  return <Redirect to='/'  render={(props) => <Shop products={products} {...props}  />} />
}

console.log(state.deleted)

 return (
    <>
     {(state.deleted  === true) ? redirectToAdmin() : ""}
     <tbody className={styles.table__body} >
       <tr>
         <td>{props.sn+1}</td>
         <td>{name}</td>
         <td>{name}</td>
         <td>${price}</td>
         <td>{_id}</td>
         <td className={styles.cell__breakword}>{description}</td>
         <td>
          <p className={styles.actionLinks}>
            <Button variant="warning" >
              <Link className={styles.addLink} to={{
                pathname:"/admin/edit/"+_id,
                editProps:{
                   id : _id
                  }
                }}> 
                Edit
              </Link>
            </Button>
          </p>
          <p className={styles.actionLinks}>
            <Button 
            variant="danger"
            onClick={e => deleteProduct(e, _id)}
             >Delete
            </Button>
          </p>
         </td>
       </tr>
     </tbody>
   </>
 )
}
