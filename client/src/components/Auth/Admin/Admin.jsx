import React,{useEffect} from 'react'
import NavBar from "../../Navbar/Navbar";
import Dashboard from "./Table/Table";
import { Table,Button} from 'react-bootstrap'
import styles from "./Admin.module.css";
import { Link ,Redirect} from "react-router-dom";
import Product from "../../../Products";
import Shop from '../../Shop/Shop';

import {fetchProducts} from "../../redux/actions/productActions";
import {useDispatch,connect} from "react-redux";



function Admin(props) {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchProducts())
  },[])


// deleting the products------------------------------------------
 const deleteProduct = async (e, id) => {
  e.stopPropagation()
   await Product.deleteProduct(id)
  .then(res=>{
    var index = props.products.findIndex(p=> p._id === id);
    console.log("index of item to be deleted : "+index)
      if (index > -1) {
       props.products.splice(index, 1);
       dispatch(fetchProducts())
      }
   })
 } 


// renderRedirect();
  const redirectToAdmin = () => {
    return <Redirect to='/'  render={(props) => <Shop products={props.products} {...props}  />} />
  }

 return (
  <div>
     <NavBar />
     <div className={styles.container}>
       
     <h1>Dashboard</h1>

     <div className={styles.addProduct}>
       <Button variant="success">
         <Link className={styles.addLink} to={{
            pathname:"/admin/add/",
            }}> 
            Add a new product
          </Link>
       </Button>
     </div> 


    <Table striped bordered hover size="sm">
       <thead className={styles.table__body}>
         <tr>
           <th>No.</th>
           <th>Image</th>
           <th>Name</th>
           <th>Price</th>
           <th>Id</th>
           <th>Desc.</th>
           <th>Actions</th>
         </tr>
       </thead>

      {props.products.map((p,i)=>(
        // <Dashboard product={p} key={i} sn={i} products={products}/>
            <tbody key={i} className={styles.table__body} >
            <tr>
              <td>{i+1}</td>
              <td>{p.name}</td>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{p._id}</td>
              <td className={styles.cell__breakword}>{p.description}</td>
              <td>
                <p className={styles.actionLinks}>
                  <Button variant="warning" >
                    <Link className={styles.addLink} to={{
                      pathname:"/admin/edit/"+p._id,
                      editProps:{
                        id : p._id
                        }
                      }}> 
                      Edit
                    </Link>
                  </Button>
                </p>
                <p className={styles.actionLinks}>
                  <Button 
                  variant="danger"
                  onClick={e => deleteProduct(e, p._id)}
                  >Delete
                    {/* <Link className={styles.addLink} to={{
                      pathname:"/admin/delete/"+_id,
                      deleteProps:{
                        id : _id
                      }
                      }}> 
                      Delete
                    </Link> */}
                  </Button>
                </p>
              </td>
            </tr>
          </tbody>

      ))}
    </Table>

     </div>
  </div>
 )
}


const mapStateToProps = state => ({
  products: state.products.items,
  loading: state.products.loading,
  error: state.products.error
});

export default connect(mapStateToProps)(Admin);




// todo : IMPORTANT NOTES:----------------------------------------------------------------------

//! I got an error here... when i was deleteting the product 
// !the page was not rerendering and so the products was not updating
// ! For simplcity purpose I added the table componnet on the admin page onlu
// !seems like that i  will have to put the whole state in the admin section .
// !For now it seems like that...lets see what happens ahead

// !So i set the products as state and whenever the product is deletec
// !the state is updated and the fetchtodos function is run again,
// !the useeffect dose not seem to work...
// !So i added the fetch function after a product is deleted and state is updted






// method for getting all the products when the component loads -------
  // const fetchTodoAndSetTodos = async () => {
  //   await Product.getAllProducts()
  //   .then(res =>{
  //     console.log(res)
  //     const products = res.data;
  //     setProducts(products)
  //     console.log(products)
  //    }).catch(err=>{
  //     console.log(err.response)
      // const errorMessage = err.response.data.message;
      // setErrorMessage(errorMessage)
      // console.log(err.response.data.message)
      // console.log(error)
  //    })
  //  }


  //  useEffect(() => {
  //   fetchTodoAndSetTodos()
  // },[])