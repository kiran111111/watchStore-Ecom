import React,{useEffect,useState} from 'react';
import styles from "./Flash.module.css";
import Bus from "../../Utils/Bus"


// IT IS A COMPONENT THAT GIVES FLASH MESSAGES ----

export default function Flash() {

  let [visibility,setVisibility] = useState(false);
  let [message,setMessage] = useState('');
  let [type,setType] = useState('');


  useEffect(() => {
   Bus.addListener('flash', ({message, type}) => {
       setVisibility(true);
       setMessage(message);
       setType(type);
       setTimeout(() => {
           setVisibility(false);
       }, 4000);
   });
 }, []);


 useEffect(() => {
  if(document.querySelector('.close') !== null) {
      document.
      querySelector('.close').
      addEventListener('click', () => setVisibility(false));
  }
})

 return (
   visibility && <div className={`alert alert-${type} m-2`}>
     <span className={styles.close}><strong>x</strong></span>
     <p>{message}</p>
   </div>
 )
}
