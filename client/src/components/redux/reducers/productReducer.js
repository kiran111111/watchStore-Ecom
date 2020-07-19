import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,

  ADD_TO_CART_BEGIN,
  ADD_TO_CART,
  DELETING_BEGIN,
  DELETE_ITEM,

  REGISTER_BEGIN,
  REGISTER_USER,
  REGISTER_USER_FAILURE,

  LOGIN_BEGIN,
  LOGIN_USER,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,

  SET_USER_BEGIN,
  SET_USER_SUCCESS,
  SET_USER_FAILURE,

  GET_CARTCONTENT,
  GET_CARTCONTENT_BEGIN,
  GET_CARTCONTENT_FAILURE,

  ADD_INVENTORY_BEGIN,
  ADD_INVENTORY_SUCCESS,

  EDIT_INVENTORY_BEGIN,
  EDIT_INVENTORY_SUCCESS
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
  error : null,
  status : '',
  cartItemsLoading :false,
  deleting : false,
  itemsError : ''
}


export  function authReducer(state = userState, action) {
  switch (action.type) {
    case LOGIN_BEGIN:
      return {...state, currentUser: {} , error : '',status :'',loading:true}
    case LOGIN_USER:
      return {...state, currentUser: action.payload.userObj , status : action.payload.status ,error : '' ,loading:false}
    case LOGIN_USER_FAILURE:
      return {...state, currentUser: {} , error : action.payload , loading:false}  
    case LOGOUT_USER:
      return {...state, currentUser: {} ,cartItemsContent : [] , status :'' , cartItemsLoading : false}

    case REGISTER_BEGIN:
      return {...state, currentUser: {} , error : '',status : '',loading:true} 
    case REGISTER_USER:
      return {...state, currentUser: {} ,status : action.payload, error : '',loading:false}      
    case REGISTER_USER_FAILURE :
      return {...state , currentUser :{},cartItemsContent : [] , error : action.payload,loading:false} 

    case SET_USER_BEGIN:
      return {...state , currentUser : {} , error : '' , loading : true}   
    case SET_USER_SUCCESS:
     return {...state , currentUser : action.payload , error : '' ,loading: false} 
    case SET_USER_FAILURE:
     return {...state , error : action.payload , currentUser : {} ,cartItemsContent : [] , loading:false} 

    case ADD_TO_CART_BEGIN:
     return {...state ,currentUser : { }  } 
    case ADD_TO_CART:
     return {...state ,currentUser : action.payload  }  
    case  GET_CARTCONTENT_BEGIN :
     return {...state , cartItemsContent : {}, cartItemsLoading:true ,itemsError : ''}  
    case  GET_CARTCONTENT :
     return {...state , cartItemsContent : action.payload , cartItemsLoading : false ,itemsError : ''} 
     case  GET_CARTCONTENT_FAILURE :
     return {...state , cartItemsContent : {} , cartItemsLoading : false , itemsError : action.payload}  

    case DELETING_BEGIN :
      return {...state, deleting : true}  
    case DELETE_ITEM  :

     let itemToRemove = state.cartItemsContent.find(item=> action.id == item.product._id)

     let new_items = state.cartItemsContent.filter(item=> action.id !== item.product._id)

     return {...state , cartItemsContent : new_items ,deleting : false }    
    default :
      return state
  }
}



// note making  async action for the delete tooo
// 11/7 done


const inventoryState = {
   loading : false
}

export  function inventoryReducer(state = inventoryState, action) {
  switch (action.type) {
    case ADD_INVENTORY_BEGIN:
      return {...state,loading : true}
    case ADD_INVENTORY_SUCCESS:
      return {...state,loading : false}
    case EDIT_INVENTORY_BEGIN:
      return {...state,loading : true}
    case EDIT_INVENTORY_SUCCESS:
      return {...state,loading : false}  
    default :
      return state
  }
}