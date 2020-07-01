import React,{useState} from 'react'
import {registerUser} from "../../../Users";
import NavBar from "../../Navbar/Navbar";
import {Redirect} from "react-router-dom";
import styles from "../Admin/Admin.module.css";
// redux-----------------------------------------------------------------------------------------
import {connect} from "react-redux";
import {userRegisterFetch} from "../../redux/actions/productActions";


const initialState = {
  username : '',
  name :'',
  password :'',
  // userNameError:'',
  // nameError:'',
  // passwordError:'',
  userIsValid :false
}


function Register(props) {

  const [user,setUser] = useState(initialState);
  const [state,setState]  = useState({registered : false});


//onChange event handler for the inputs ------------------------------------------------
  function handleChange(evt) {
    const value = evt.target.value;
    setUser({...user,
      [evt.target.name]: value
    });
  }

//todo validate user later on------------------------------------------------------------
  // console.log(user)
  // console.log(props)




  const handleRegister = event => {
    event.preventDefault()
    props.userRegisterFetch(user)
    setState({registered:true})
    window.flash('Succesfully registered ', 'success') 
  }


  // renderRedirect();
  const renderRedirect = () => {
    return <Redirect to='/' />
  }


 return (
  <div>
    <NavBar />

    <div   className={styles.action__container} >
     {(state.registered  === true) ? renderRedirect() : ""}
     <h1> Register </h1>
      <form 
        onSubmit={handleRegister}
        className={styles.form}
        >

        <label className={styles.label}>Name</label>
          <input 
            className={styles.inputField}
            name="name"
            placeholder='Name...'
            // value={product.image && product.image}
            onChange={(e) => handleChange(e)}
            /><br/> 

        <label className={styles.label}>Username</label>
          <input
            className={styles.inputField}
            name='username'
            placeholder='Email...'
            // value={product.name}
            onChange={(e) => handleChange(e)}
          /><br/>

        <label className={styles.label}>Password</label>
          <input
            className={styles.inputField}
            type="text"
            name='password'
            placeholder='Password...'
            // value={product.price}
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
  userRegisterFetch : userInfo => dispatch(userRegisterFetch(userInfo))
})

export default connect(null, mapDispatchToProps)(Register);