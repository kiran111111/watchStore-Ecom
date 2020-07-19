import React from 'react'
import {connect} from "react-redux";

function ErrorNotifiacations(props) {


 let error = props.errorAuth;

 return (
  <div>
    {error ?
     window.flash(error, 'danger') 
    :
     ''
    }
  </div>
 )
}

const mapStateToProps = (state)=>{
 return{
   errorAuth : state.auth.error,
   currentUser : state.auth.currentUser
 }
}

export default connect(mapStateToProps,null)(ErrorNotifiacations)