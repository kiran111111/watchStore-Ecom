const express = require("express");
const router = express.Router();
const mongo = require("mongo");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

// Schema model setup for database
const userSchema = require("../models/users/users")
// Module for the database model
const User = mongoose.model("Users",userSchema);
// Product model
const Product = require("../models/products/products");



// Middleware for verifying the token before letting user visit any page---------------------------------------

exports.verifyToken = async (req, res, next)=> {
 // check header or url parameters or post parameters for token
 var token = req.headers['authorization'].split(" ")[1];
 if (!token) {
   return res.status(403).send({ auth: false, message: 'User not Authenticated' });
 }
 // verifies secret and checks exp
 else{
  await jwt.verify(token, "secret124", function(err, decoded) {      
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to Authenticate token.' });    
    }
    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
 }
}



// get products from user table
exports.getProducts = async(req,res) =>{
  try{
    const items = await User.findOne({ _id: req.userId }).populate(
            "cartItems.product"
          );
    res.json(items.cartItems)
  }
  catch(err){
    if(err){
      res.send(err)
    }
  }
}



// function to delete a specified product:
// we have used the $pull expression to remove a selected product from an array : 
exports.deleteProduct = async(req,res) =>{

   const productId = req.body.id;
   let query = { 
          '_id': req.userId ,
          'cartItems.product' : productId
           }

  await User.findOneAndUpdate(
    { '_id': req.userId  },
    { $pull: { cartItems : {product : productId} }}, function(err, data) {
      if (err) res.render('error', { 
        message: 'Sorry failed to delete card id in users',
        error: { status: err, stacks: 'failed to delete card id in users' }
      });
      else{
        res.send("deleted")
      }
    }
  )

}




// In-order to get the current User---------------------------------------------------
exports.getCurrentUser = async(req,res) =>{

   await User.findOne({_id:req.userId},(err,docs)=>{
        if(err){
          res.send(err)
        }
        else{
          res.send(docs)
        }
   })
}


// adding item to the cart
exports.addItemToCart = async(req,res) =>{

  const productId = req.body.id;
  const quantity = req.body.qty;

  try{
   const user = await User.findOne({_id:req.userId});
  //  Here I was getting an error of '===' , needed '=='
   const productExists = await user.cartItems.find(p => p.product == productId )
  //  console.log("exists pr : "+productExists) ;
 
   if (productExists) {
 
    //*** */  This is very important concept--------------DO GO THROUGH IT AFTERWARDS----
     const data =  await User.findOneAndUpdate(
         { 
          '_id': req.userId ,
          'cartItems.product' : productId
           },
             {
               $set: {
                 'cartItems.$.quantity': quantity
             }}
         ,(err,docs)=>{
           if(err){
             console.log(err)
           }
         })
      console.log("data :"+data)
      res.send(data);
    } else {
      const newProduct = { product : productId ,quantity : quantity};
      // console.log(newProduct)
      const data = await User.findOneAndUpdate(
        { _id: req.userId },
        { $addToSet: { cartItems : newProduct } }
      );

      const updatedUser = await User.findOne({_id:req.userId});
      res.send(updatedUser)
    }
  }

  catch(err){
    if(err){
      res.status(401).send("Cannot add to cart");
    }
  }
}



// Route for registering user-----------------------------------------------------------
exports.registerUser =  async (req,res) =>{
 await User.findOne({username:req.body.username},async (err,docs)=>{
  if(err){
   res.status(401).send(
    'Error occured !'
   );
  }
   else if(docs){
    res.status(401).send("User already exists!!!");
    res.redirect("/register");
   }else{
    try{
     const hashedPassword = await bcrypt.hash(req.body.password,10);
      let user = new User({
       name:req.body.name,
       username:req.body.username,
       password:hashedPassword
      }) 

       await user.save((err,user)=>{
        if (err) return res.status(500).send("There was a problem registering the user`.");
        // if user is registered without errors
        // create a token
        else if(!err){
          var token = jwt.sign({ id: user._id }, "kitten", {
            expiresIn: 10 // expires in 24 hours
          });
          res.send({token:token})
        } 
       });
      console.log("user has been created")
      }catch(err){
        res.status(401).send("User already exists!!!");
     }
    }
  }) 
}



// new ...LOGIN route---------------------------------------------------------------------
exports.loginUser = (req,res) =>{
     
 const query = { username : req.body.username};
 let password = req.body.password;

   User.findOne(query, async function(err, user) {
       if (err) { 
         return res.status(401).send({
           error: 'Error in finding User !.'
          });
        }
       if (!user) {
         console.log('Username not Found, Please Register !')
          return res.status(401).send('Username not found')
        }
       else{
         try{
           if( await bcrypt.compare(password,user.password)){
                 // if password also correct then -----
                 var token = jwt.sign({ id: user._id }, "secret124", {
                   expiresIn: 3600 * 24// expires in 24 hours
                  });
                 console.log("logged in !!!")
                 res.send({token:token,user : user})
                 // else
               }else{
                  res.status(401).send('Incorrect Password');
               }
           }catch(err){
             console.log(err)
             res.status(401).send({
               error: 'Error occured!!!'
            });
          }
       }
     }
   )
 };




// Logout Route for the user
exports.logoutUser =  (req, res) =>{
 req.logout();;
 res.redirect('/login');
};