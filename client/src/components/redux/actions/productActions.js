import {mainHttp as axios} from "../../../Axios/axios" ;

//------------------------------------------------------------------CONSTANTS-------------************************************************ 

// Fetch data from the API
export const FETCH_PRODUCTS_BEGIN   = 'FETCH_PRODUCTS_BEGIN';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

// CART
export const ADD_TO_CART_BEGIN = 'ADD_TO_CART_BEGIN';
export const ADD_TO_CART = 'ADD_TO_CART';

export  const GET_CARTCONTENT_BEGIN = 'GET_CARTCONTENT_BEGIN';
export  const GET_CARTCONTENT = 'GET_CARTCONTENT';
export const GET_CARTCONTENT_FAILURE = "GET_CARTCONTENT_FAILURE"

export  const DELETING_BEGIN = 'DELETING_BEGIN';
export  const DELETE_ITEM = 'DELETE_ITEM';

// AUTH
export const LOGIN_BEGIN = 'LOGIN_BEGIN';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const REGISTER_BEGIN = 'REGISTER_BEGIN';
export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const LOGOUT_USER = 'LOGOUT_USER';

export const SET_USER_BEGIN = 'SET_USER_BEGIN';
export const SET_USER_SUCCESS = 'SET_USER_SUCCESS'
export const SET_USER_FAILURE = 'SET_USER_FAILURE'


// SHOP PAGE;
export const ADD_INVENTORY_BEGIN = 'ADD_INVENTORY_BEGIN';
export const ADD_INVENTORY_SUCCESS = 'ADD_INVENTORY_SUCCESS';

export const EDIT_INVENTORY_BEGIN = "EDIT_INVENTORY_BEGIN";
export const EDIT_INVENTORY_SUCCESS = 'EDIT_INVENTORY_SUCCESS';


// we have used redux thunk 
// it lets us return function from an action creator---------

export function fetchProducts() {
  console.log("gfgdfhgdfhdf")
 return async (dispatch) => {
   dispatch(fetchProductsBegin());

   return await axios.get(`/`)
     .then(res => {
      console.log(res)
       dispatch(fetchProductsSuccess(res.data));
       return res.data;
     })
   .catch(error =>{ 
    console.log(error)
    // console.log({message : error.response.data.message})
    dispatch(fetchProductsFailure(error)
    )
  });
 };
}


// userPost----Register-----Fetch---------------------------------------------------------------------

export const userRegisterFetch = user => {
  return async dispatch => {
    dispatch(registerBegin())
    return await axios.post(`/register`,user)
    .then(res => {
      localStorage.setItem("token", res.data.token)
      dispatch(registerUser(res.data.token)) 
       return res.data;
     })
   .catch(error =>{ 
    dispatch(registerUserFailure(error.response.data))
     })
  }
}


// userPost----Register-----Fetch---------------------------------------------------------------------

export const userLoginFetch = user => {
  return async dispatch => {
    dispatch(loginBegin())
    return await axios.post(`/login`,user)
    .then(res => {
    
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user",res.data.user.name)
      let token = localStorage.getItem('token') ;
      let user = localStorage.getItem('user')

    
      dispatch(loginUser(res.data.user)) 
       return res.data;
     })
   .catch(error =>{ 
  
    dispatch(loginUserFailure(error.response.data)) 

     })
  }
}



// For getting the current user all the time-----------------------------------------
export const fetchCurrentUser = ( ) => {
  return async dispatch => {
    dispatch(setUserBegin()) 
     let token = localStorage.getItem('token')

    return await axios.get(`/currentUser`,{
      headers :{
        authorization : `Bearer ${token}`
      }
    })
    .then(res => {

       dispatch(setUserSuccess(res.data)) 
       return res.data;
     })
   .catch(error =>{ 
    
     dispatch(setUserFailure(error.response.data.message))

     })
  }
}


// later on method for getting items
// addd a new key for item details in the redux store
// function for getting items of the cart
export const fetchCartItems = () => {
  return async dispatch => {
    dispatch(getCartContentBegin()) 
    let token = localStorage.getItem('token')

    return await axios.get(`/getProducts`,
      {
       headers :{
        authorization : `Bearer ${token}`
       }
    })
    .then(res => {
     
    //todo : what you need to do at the backend while adding to cart
      dispatch(getCartContent(res.data)) 
       return res.data;
     })
   .catch(error =>{ 
     
      dispatch(getCartContentFailure(error.response.data.message))
     })
  }
}

// -------------------------------------------------------------------------------




// function for adding item to cart
export const addItemToCart = (id,qty) => {
  return async dispatch => {

    dispatch(addToCartBegin()) 
  let token = localStorage.getItem('token')

    return await axios.post(`/addItemToCart/`,
      {id : id,
      qty : qty || 1
      },
      {
       headers :{
        authorization : `Bearer ${token}`
       }
    })
    .then(res => {

    //todo : what you need to do at the backend while adding to cart
      dispatch(addToCart(res.data)) 
       return res.data;
     })
   .catch(error =>{ 
   
    console.log({message : error.response.data.message})
     })
  }
}



// function for adding item to cart
export const deleteFromCart = (id) => {
  return async dispatch => {
    dispatch(deletingBegin())

    let token = localStorage.getItem('token')

    return await axios.post(`/deleteProduct/`,
      {id : id},
      {
       headers :{
        authorization : `Bearer ${token}`
       }
    })
    .then(res => {

      dispatch(deleteProductFromCart(id))  
      dispatch(fetchCurrentUser())
     })
   .catch(error =>{ 
    console.log("an error has occred")
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
export const loginBegin = () => ({
  type: 'LOGIN_BEGIN'
})


export const loginUser = userObj => ({
  type: 'LOGIN_USER',
  payload: {
    userObj : userObj,
    status : 'loggedIn'
  }
})

export const loginUserFailure = msg  => ({
  type: 'LOGIN_USER_FAILURE',
  payload: msg
})


export const registerBegin = () => ({
  type: 'REGISTER_BEGIN'
})


export const registerUser = () => ({
  type: 'REGISTER_USER',
  payload: 'registered'
})

export const registerUserFailure = msg => ({
  type: 'REGISTER_USER_FAILURE',
  payload: msg
})

export const logoutUser = () => ({
  type: 'LOGOUT_USER'
})


export const setUserBegin = () =>({
  type : 'SET_USER_BEGIN'
})

export const setUserSuccess = (userObj) =>({
  type : 'SET_USER_SUCCESS',
  payload : userObj
})

export const setUserFailure = (msg) => ({
  type : 'SET_USER_FAILURE',
  payload : msg
})


// Action creator for adding elem into the cart ------------------------

export const addToCartBegin = () => ({
  type: ADD_TO_CART_BEGIN
})


export const addToCart = (userObj) => ({
  type: ADD_TO_CART,
  payload : userObj
})


export const getCartContentBegin = () => ({
  type: GET_CARTCONTENT_BEGIN
})

export const getCartContent = (cartContent) => ({
  type: GET_CARTCONTENT,
  payload : cartContent
})

export const getCartContentFailure = (msg) => ({
  type: GET_CARTCONTENT_FAILURE,
  payload : msg
})


// Action creator for removing all the items ------------------------
export const deletingBegin = () => ({
  type: DELETING_BEGIN
})



export const deleteProductFromCart = (id) => ({
  type: DELETE_ITEM,
  id : id
})


// Adding inventory in the store;
export const addInventoryBegin = () =>  ({
  type : ADD_INVENTORY_BEGIN
})


export const addInventorySuccess = () =>  ({
  type : ADD_INVENTORY_SUCCESS
})

// Editing inventory of the store---
export const editInventoryBegin = ()  =>({
  type : EDIT_INVENTORY_BEGIN
})

export const editInventorySuccess = ()  =>({
  type : EDIT_INVENTORY_SUCCESS
})