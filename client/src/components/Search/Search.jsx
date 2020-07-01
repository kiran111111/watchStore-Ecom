import React,{useState} from 'react';
import styles from "./Search.module.css"
import Navbar from "../Navbar/Navbar";
import Product from "../Product/Product"

import { connect ,useDispatch} from 'react-redux';

function Search(props) {

 const [state,setState] = useState({suggestions:[],text:''})

 console.log(props)

 const onTextChange=(e) => {
  let suggestions = [];
  let value = e.target.value;
  if(value.length > 0){
    let patt = new RegExp(`^${value}`,'i')
    suggestions = props.items.filter(v => patt.test(v.name));
  }

   setState({
     text:e.target.value,
     suggestions : suggestions
   })
 }

 console.log(state)


 // render the suggestions products .................................
 const renderSuggestions = () => {
  //  let suggestions = this.state;
   if(state.suggestions.length == 0){
     return null;
   }
   else{
     return (
       <div className={styles.product__list}>
         {
           state.suggestions.map((item,i)=>(
          //  there should be no brackets here*****
               <Product item={item}  key={i}/>
             )
           )
         }
       </div>
     )
   }
 }



// Autosearch component / autocomplet

 return (
  <div>
    <Navbar />
    <div class={styles.container}>
     <input
      type="text"
      name="search"
      value={state.text}
      onChange={(e) => onTextChange(e)}
      className={styles.search__input}
      placeholder="Search"
      ></input>
     <div className={styles.results__container}>
      {/* results will be shown here  */}
      <p className={styles.products__numbers}>{state.suggestions.length} Products Found !</p>
      <div className={styles.results__wrapper}>
       {/* Products show up in here */}
       {renderSuggestions()}
      </div>
     </div>
    </div>
  </div>
 )
}



const mapStateToProps = (state)=>{
 return{
     items: state.products.items,
     user : state.auth.currentUser.name
 }
}

// const mapDispatchToProps = dispatch => ({
//  logoutUser: () => dispatch(logoutUser())
// })

export default connect(mapStateToProps,
 // mapDispatchToProps
 )(Search)