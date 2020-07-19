import React,{useEffect,useState} from 'react';
import './App.css';
import {Route,Switch,Redirect} from "react-router-dom";
// import the all the components being used ------------------------------
import Shop from "./components/Shop/Shop";
import Cart from "./components/Cart/Cart";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Admin from "./components/Auth/Admin/Admin";
import View from "./components/View/View";
import Add from "./components/Auth/Admin/Add/Add";
import Edit from "./components/Auth/Admin/Edit/Edit";
import Search from "./components/Search/Search";
// wrong path
import Filter from "./components/FilterProducts/Filters/Filter"
// Get the Axios file----------------------------------------------------------------
import axios from "axios";
import Bus from "./Utils/Bus"

import {fetchProducts,fetchCurrentUser,fetchCartItems} from "./components/redux/actions/productActions";
import {useDispatch,connect} from "react-redux";

function App(props) {

  const [error,setErrorMessage] = useState('');
  const [state,setState] = useState({changed:false});

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchProducts())
    dispatch(fetchCurrentUser())
     dispatch(fetchCartItems())
  },[])
 

  console.log(props)
  // flash message
  window.flash = (message, type="success") => Bus.emit('flash', ({message, type}));


  return (
    <div className="App">
      <Switch>
        {/* This is how you render the component in route field by adding additiobal components */}
        <Route  path="/" 
          render={(props) => {
              return  <Shop  products={props.products} {...props} />
           }}
         exact />
        <Route  path="/search" component={Search} />
        <Route  path="/cart" render={(props) => <Cart  {...props} products={props.products}  />}  exact />
        <Route  path="/login" component={Login} />
        <Route  path="/register" component={Register} />
        <Route
          path={`/product/:id`}
          render={(props) => <View  products={props.products} {...props}  />}
        />
        <Route  path="/admin" render={(props) => <Admin  {...props}  />}  exact/>
        <Route  path="/admin/add" component={Add}  exact/>
        <Route  path="/admin/edit/:id" render={(props) => <Edit  {...props}  />}  exact/>
        <Route  path="/*" render={(props) => <Filter  {...props}  />}  exact/>
      </Switch>
    </div>
  );
}


const mapStateToProps = state => ({
  products: state.products.items,
  loading: state.products.loading,
  error: state.products.error
});



export default connect(mapStateToProps)(App);




