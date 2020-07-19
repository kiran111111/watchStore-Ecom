import React,{useState,useEffect} from 'react'
import NavBar from "../../Navbar/Navbar";
import {Spinner} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import styles from "../Admin/Admin.module.css";
import {loginUser} from "../../../Users";
import axios from "axios";
import Error from "../../ErrorNotifications/ErrorNotifiacations"
// redux--------------------------------------------------------------------------------
import {connect ,useDispatch} from "react-redux";
import {userLoginFetch,fetchProducts,fetchCartItems,loginBegin} from "../../redux/actions/productActions";

function Login(props) {

 
  const dispatch = useDispatch();
  const [user, setUser] = useState({username : '',password :""})
  const [log,setLogin]  = useState({login : false,user : ''});

 

//onChange event handler for the inputs ------------------------------------------------
  function handleChange(evt) {
    const value = evt.target.value;
    setUser({...user,
      [evt.target.name]: value
    });
  }


  const handleLogin = event => {
    event.preventDefault()
    // axios.defaults.headers.common['Authorization'] = '';
    props.userLoginFetch(user)
     .then(res =>{
       if(res){
        setLogin({
          login : true,
          user : user
          })  
          dispatch(fetchCartItems)   
          dispatch(fetchProducts) 
        } 
      })
    }

  if (log.login){
    window.flash('Succesfully logged in ! ', 'success') 
   }


  // render to home when the user is logged in-----------------------------
  const  renderToHome = () => {
    return <Redirect 
        to={{
          pathname: '/',
          user: { name: log.user }
      }}
    />
  }


  const  renderToLogin = () => {
    return <Redirect 
        to={{
          pathname: '/login'
      }}
    />
  }


  return (
    <div>
      <NavBar />


     {props.loading ? 
       <div><Spinner animation="border" variant="info" /> </div> 
      :
      // if loaded properly then show the content else the spinner above

      <div className={styles.action__container} >
      <Error />
        {(props.status  === 'loggedIn') ?
          renderToHome()
          // ''
          :
          renderToLogin() 
        }
      <h1> Login </h1>
      <form 
        method="post" 
        enctype="multipart/form-data" 
        onSubmit={handleLogin}
        className={styles.form}
        >


        <label className={styles.label}>Username</label>
          <input
            className={styles.inputField}
            name='username'
            placeholder='Email...'
            value={user.username}
            onChange={(e) => handleChange(e)}
          /><br/>

        <label className={styles.label}>Password</label>
          <input
            className={styles.inputField}
            type="text"
            name='password'
            placeholder='Password...'
            value={user.password}
            onChange={(e) => handleChange(e)}
          />
        <br/> 

        <input className={styles.button} type='submit' />    

       </form>

      </div> 
     }
 
    </div>
  )
}

const mapStateToProps = state => ({
  error: state.auth.error,
  status : state.auth.status,
  loading : state.auth.loading 
});


const mapDispatchToProps = dispatch => ({
  userLoginFetch : userInfo => dispatch(userLoginFetch(userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);