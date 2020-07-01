const mongoose = require("mongoose");
const Product = require("../models/products/products");
const path  = require("path");
// modu
let multer = require('multer')
let uuidv4 = require('uuid')
const jimp = require("jimp");

exports.upload = multer({dest:'../public/'}).single('image');

const DIR = "./uploads/";

// creating multer disk storage-----------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, DIR);
  },
  filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split('\\').splice(-1,1);
      cb(null, 3456 + '-' + fileName)
  }
});


// adding filters to the upload request
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
  } else {
      cb("Type file is not access", false);
  }
};

exports.upload = multer({
  storage,
  fileFilter,
  limits: 1024 * 1024 * 5
}).single("file");

// Query to get list of stores
exports.getProducts = async (req,res) =>{
 try{
   await Product.find({},(err,docs)=>{
     if(err){
       res.send("error")
     }else{
       res.json(docs)
     }
   });
 }
 catch(err){
   res.send("Error")
 }
  
}



// Route to create product
exports.createProduct = async (req,res)=>{

  const url = req.protocol + '://' + req.get('host')

  // let product = new Product(req.body);
  let product = new Product({
    name: req.body.name,
    price:req.body.price,
    // image:url + '/public/' + req.file.filename,
    file:url + '/uploads/' + req.file.filename,
    image:url + '/uploads/' + req.file.filename,
    description:req.body.description
  });

  console.log(product)
  
  try{
    await product.save(err=>{
      if(err){
        console.log(err)
        res.send("error")
      }else{
        res.send("product created")
      }
    });
  }catch(err){
    if(err){
      console.log(err)
      res.send("error")
    }
  }
}



// Route to get to  the Edit the Store page 
exports.editProduct = async (req,res) =>{
 //  1. Get the store with the given Id

 const url = req.protocol + '://' + req.get('host')


 console.log("edit details"+req.body.name)
 console.log("edit details"+req.params.id)
 console.log(req.body)
 console.log(req.file)
 try{
  await Product.findOneAndUpdate({_id: req.params.id},
     req.body
    ,(err,docs)=>{
    if(err){
      console.log(err)
      res.send("error")
    }else{
      console.log(docs)
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
      console.log("deleted product")
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
