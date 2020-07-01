import React,{useState} from 'react'
import NavBar from "../../Navbar/Navbar";
import {Redirect} from "react-router-dom";
import styles from "../Admin/Admin.module.css";
import {loginUser} from "../../../Users";
import axios from "axios";
// redux--------------------------------------------------------------------------------
import {connect ,useDispatch} from "react-redux";
import {userLoginFetch,fetchProducts,fetchCartItems} from "../../redux/actions/productActions";

function Login(props) {

  console.log(props)
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
    setLogin({
      login : true,
      user : user
      })  
    dispatch(fetchCartItems)   
    dispatch(fetchProducts)  
    window.flash('Succesfully logged in', 'success') 
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


  return (
    <div>
      <NavBar />

      <div className={styles.action__container} >
       {(log.login === true) ? renderToHome() : ""}
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
    </div>
  )
}


const mapDispatchToProps = dispatch => ({
  userLoginFetch : userInfo => dispatch(userLoginFetch(userInfo))
})

export default connect(null, mapDispatchToProps)(Login);