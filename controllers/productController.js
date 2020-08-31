const mongoose = require("mongoose");
const Product = require("../models/products/products");
const path  = require("path");
// modu
let multer = require('multer')
let uuid = require('uuid')
const jimp = require("jimp");



 
// Query to get list of stores
exports.getProducts = async (req,res) =>{
 try{
   await Product.find({},(err,docs)=>{
     if(err){
       res.send("error")
     }else{
      res.send(docs)
     }
   });
 }
 catch(err){
   res.send("Error")
 }
  
}



// Route to create product
exports.createProduct = async (req,res)=>{

  let product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imageLink:req.body.imageLink
  });

  try{
    await product.save(err=>{
      if(err){
        res.send(err)
      }else{
        res.send("product created")
      }
    });
  }catch(err){
    if(err){
      res.send("error")
    }
  }
}


// Route to get to  the Edit the Store page 
exports.editProduct = async (req,res) =>{
 //  1. Get the store with the given Id

 await Product.find({_id: req.params.id});
  try{
    await Product.findOneAndUpdate({_id: req.params.id},
     req.body
      ,(err,docs)=>{
      if(err){
        res.send("error")
      }else{
      res.send(docs)
      }
    })
  }
 catch(err){
   if(err){
     res.send("error")
   }
 }
}


// Route for deleting a Product:    
exports.deleteProduct = async (req,res,next)=>{
 let query = { _id: req.params.id };
  try{
   await Product.deleteOne(query,(err,docs)=>{
     if(err){
      res.send("error")
     }
     else{
      res.send(docs)
     }
   })
  }
  catch(err){
   if(err){
    next({ status: 400, message: "Failed to delete product" })
   }
  }
}
