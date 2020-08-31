import React,{useState,useEffect} from 'react'
import {registerUser} from "../../../Users";
import {Spinner} from "react-bootstrap";
import NavBar from "../../Navbar/Navbar";
import {Redirect} from "react-router-dom";
import styles from "../Admin/Admin.module.css";
import Error from "../../ErrorNotifications/ErrorNotifiacations"
// redux-----------------------------------------------------------------------------------------
import {connect,useDispatch} from "react-redux";
import {userRegisterFetch,registerBegin} from "../../redux/actions/productActions";


const initialState = {
  username : '',
  name :'',
  password :'',
  userNameError:'',
  nameError:'',
  passwordError:'',
  userIsValid :false
}


function Register(props) {

  const [user,setUser] = useState(initialState);
  const [error,setError] = useState('')
  const dispatch = useDispatch();



//onChange event handler for the inputs ------------------------------------------------
  function handleChange(evt) {
    const value = evt.target.value;
    setUser({...user,
      [evt.target.name]: value
    });
  }



  
  // validate before refistering user
  const registerValidation = () =>{

    var passpat = /^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,15}$/;
    const {username,name,password} = user;

    let nameError = "";
    let userNameError = "";
    let passwordError = "";

    if(!name){
      nameError = 'Name cannot be blank'
    }
    if(name.length < 6){
      nameError = 'Name should be of more than 5 characters!!!'
    }
    if(!username){
      userNameError = 'Username cannot be blank'
    }
    if (!username.includes("@")) {
      userNameError = "Invalid email";
    }
  
    if(passpat.test(password) === false ){
      passwordError =  "Atleast one uppercase , 8-15 Characters , Atleast one number and  No spaces ";
    }

    if(nameError || userNameError  || passwordError){
      setUser({
        nameError,
        userNameError,
        passwordError,
        username:username,
        name:name,
        password:password
       });
      return false;
    }
    return true;
  }



//todo validate user later on------------------------------------------------------------
 
  const handleRegister = event => {
    event.preventDefault()
    // console.log(props)
    if(props.error){
      setError(props.error)
    }

    const isValid = registerValidation();
    if(isValid){
      setUser({
        nameError : '',
        userNameError : '',
        passwordError : ''
      });
      props.userRegisterFetch(user)
      .then(res=>{
        if(res){
          window.flash('Succesfully registered ', 'success') 
        }
      })
    }
  }


  // renderRedirect();
  const renderRedirect = () => {
    return <Redirect to='/register' />
  }



 return (
  <div>
    <NavBar />
      
      
    {props.loading ? 
    
       <div><Spinner animation="border" variant="info" /> </div>
      :
      // if loaded properly then show the content else the spinner above
       <>
    <div   className={styles.action__container} >
      <Error />
      {(props.status  === 'registered') ? renderRedirect() : ""}
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
            <div  className={styles.validationError}>{user.nameError}</div>  



          <label className={styles.label}>Username</label>
            <input
              className={styles.inputField}
              name='username'
              placeholder='Email...'
              // value={product.name}
              onChange={(e) => handleChange(e)}
            /><br/>
             <div className={styles.validationError}>{user.userNameError}</div>  



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
          <div  className={styles.validationError}>{user.passwordError}</div>  
          

          <input className={styles.button} type='submit' />    

         </form>
        </div>
      </>    
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
  userRegisterFetch : userInfo => dispatch(userRegisterFetch(userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);