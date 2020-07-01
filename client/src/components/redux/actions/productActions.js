import axios from 'axios';

//------------------------------------------------------------------CONSTANTS-------------************************************************ 

// Fetch data from the API
export const FETCH_PRODUCTS_BEGIN   = 'FETCH_PRODUCTS_BEGIN';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

// CART
export const ADD_TO_CART = 'ADD_TO_CART';
export  const GET_CARTCONTENT = 'GET_CARTCONTENT';
export  const DELETE_ITEM = 'DELETE_ITEM';

// AUTH
export const LOGIN_USER = 'LOGIN_USER';
export const REGISTER_USER = 'REGISTER_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_USER = 'SET_USER';
export const SET_USER_SUCCESS = 'SET_USER_SUCCESS'
export const SET_USER_FAILURE = 'SET_USER_FAILURE'




// we have used redux thunk 
// it lets us return function from an action creator---------

export function fetchProducts() {
 return async (dispatch) => {
   dispatch(fetchProductsBegin());

   return await axios.get('http://localhost:5000/')
     .then(res => {
      console.log(res)
       dispatch(fetchProductsSuccess(res.data));
       return res.data;
     })
   .catch(error =>{ 
    console.log("an error has occred")
    dispatch(fetchProductsFailure(error)
    )
  });
 };
}


// userPost----Register-----Fetch---------------------------------------------------------------------

export const userRegisterFetch = user => {
  return async dispatch => {
    return await axios.post("http://localhost:5000/register",user)
    .then(res => {
      console.log(res)
      localStorage.setItem("token", res.data.token)
      dispatch(registerUser(res.data.user)) 
       return res.data;
     })
   .catch(error =>{ 
    console.log("an error has occred")
     })
  }
}


// userPost----Register-----Fetch---------------------------------------------------------------------

export const userLoginFetch = user => {
  return async dispatch => {
    return await axios.post("http://localhost:5000/login",user)
    .then(res => {
      console.log(res)
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user",res.data.user.name)
      let token = localStorage.getItem('token') ;
      let user = localStorage.getItem('user')

      console.log(token + user)
      dispatch(loginUser(res.data.user)) 
       return res.data;
     })
   .catch(error =>{ 
    console.log("an error has occred")
     })
  }
}



// For getting the current user all the time-----------------------------------------
export const fetchCurrentUser = (token) => {
  return async dispatch => {
     let token = localStorage.getItem('token')
     console.log(token);
    return await axios.get("http://localhost:5000/currentUser",{
      headers :{
        authorization : `Bearer ${token}`
      }
    })
    .then(res => {
       console.log(res)
       dispatch(setUser(res.data)) 
       return res.data;
     })
   .catch(error =>{ 
     console.log(error)
     console.log("an error has occred")
     })
  }
}


// later on method for getting items
// addd a new key for item details in the redux store
// function for getting items of the cart
export const fetchCartItems = () => {
  return async dispatch => {
    let token = localStorage.getItem('token')
console.log(token);
    return await axios.get("http://localhost:5000/getProducts",
      {
       headers :{
        authorization : `Bearer ${token}`
       }
    })
    .then(res => {
      console.log(res.data)
    //todo : what you need to do at the backend while adding to cart
      dispatch(getCartContent(res.data)) 
       return res.data;
     })
   .catch(error =>{ 
    console.log("an error has occred")
    console.log(error)
     })
  }
}

// -------------------------------------------------------------------------------




// function for adding item to cart
export const addItemToCart = (id,qty) => {
  return async dispatch => {
    console.log("qty : "+qty)
  
  let token = localStorage.getItem('token')
console.log(token);
    return await axios.post("http://localhost:5000/addItemToCart",
      {id : id,
      qty : qty || 1
      },
      {
       headers :{
        authorization : `Bearer ${token}`
       }
    })
    .then(res => {
      console.log(res)
    //todo : what you need to do at the backend while adding to cart
      dispatch(addToCart(res.data)) 
       return res.data;
     })
   .catch(error =>{ 
    console.log("an error has occred")
    console.log(error)
     })
  }
}


// function for adding item to cart
export const deleteFromCart = (id) => {
  return async dispatch => {
   console.log(id)
    let token = localStorage.getItem('token')
console.log(token);
    return await axios.post("http://localhost:5000/deleteProduct",
      {id : id},
      {
       headers :{
        authorization : `Bearer ${token}`
       }
    })
    .then(res => {
      console.log('deleted the product')
      dispatch(deleteProductFromCart(id))  
    //todo : what you need to do at the backend while adding to cart
      // dispatch(deleteProductInCart(res.data)) 
      //  return res.data;
     })
   .catch(error =>{ 
    console.log("an error has occred")
    console.log(error)
     })
  }
}



// Action creators for fetching data-----------------------------------

export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN
});

export const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products }
});

export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error }
});



// auth--------------------------------------------------------
// registering ----- logging  ----- getting user ----------------------------
export const loginUser = userObj => ({
  type: 'LOGIN_USER',
  payload: userObj
})


export const registerUser = userObj => ({
  type: 'REGISTER_USER',
  payload: userObj
})

export const logoutUser = () => ({
  type: 'LOGOUT_USER'
})

export const setUser = (userObj) =>({
  type : 'SET_USER',
  payload : userObj
})


// Action creator for adding elem into the cart ------------------------
export const addToCart = (userObj) => ({
  type: ADD_TO_CART,
  payload : userObj
})


export const getCartContent = (cartContent) => ({
  type: GET_CARTCONTENT,
  payload : cartContent
})


// Action creator for removing all the items ------------------------
export const deleteProductFromCart = (id) => ({
  type: DELETE_ITEM,
  id : id
})