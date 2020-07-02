import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  ADD_TO_CART,
  DELETE_ITEM,
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  SET_USER_SUCCESS,
  GET_CARTCONTENT
} from '../actions/productActions';

const initialState = {
  items: [],
  loading: true,
  error: null
};

// The loading value should be set to true in the beginning....
// until the data is available from the backend


export  function productReducer(state = initialState, action) {
 switch(action.type) {
   case FETCH_PRODUCTS_BEGIN:
     // Mark the state as "loading" so we can show a spinner or something
     // Also, reset any errors. We're starting fresh.
     return {
       ...state,
       loading: true,
       error: null
     };

   case FETCH_PRODUCTS_SUCCESS:
     // All done: set loading "false".
     // Also, replace the items with the ones from the server
     return {
       ...state,
       loading: false,
       items: action.payload.products
     };

   case FETCH_PRODUCTS_FAILURE:
    //  IN CASE OF FAILURE
     return {
       ...state,
       loading: false,
       error: action.payload.error,
       items: []
     };

   default:
     // ALWAYS have a default case in a reducer
     return state;

  }
}






// user reducer
// user state for cart items and purchasing
const userState = {
  currentUser : {},
  cartItemsContent : '',
  quantity: 0,
  total :0,
  loading : false,
  error : null
}

export  function authReducer(state = userState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {...state, currentUser: action.payload}
    case LOGOUT_USER:
      return {...state, currentUser: {} ,cartItemsContent : []}  
    case SET_USER_SUCCESS:
     return {...state , currentUser : action.payload} 
    case ADD_TO_CART:
     return {...state ,currentUser : action.payload }  
    case  GET_CARTCONTENT :
     return {...state , cartItemsContent : action.payload }  
    case DELETE_ITEM  :

     console.log(action.id)

     let itemToRemove = state.cartItemsContent.find(item=> action.id == item.product._id)
     console.log(itemToRemove);
     
     let new_items = state.cartItemsContent.filter(item=> action.id !== item.product._id)
     console.log(new_items)

     return {...state , cartItemsContent : new_items }    
    default :
      return state
  }
}


