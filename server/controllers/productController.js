const mongoose = require("mongoose");
const Product = require("../models/products/products");
const path  = require("path");
// modu
let multer = require('multer')
let uuid = require('uuid')
const jimp = require("jimp");

exports.upload = multer({dest:'../public/'}).single('image');

const DIR = "./uploads/";


const multerOptions = {
  storage : multer.memoryStorage(),

  fileFilter(req,file,next){
    const isPhoto = file.mimetype.startsWith('image/');
    if(isPhoto){
      next(null,true)
    }else{
      const msg = "not";
      next({message:'This filetype is not allowed'},false);
    }
  }
}

// Middleware for uploading photos
exports.uploads = multer(multerOptions).single('file');


// Middleware for resizing the photos
exports.resize = async (req,res,next) =>{
  // check if there is no new file
  if(!req.file){
    next();// skip to next middleware
    return;
  }
  const url = req.protocol + '://' + req.get('host');
  const extension = req.file.mimetype.split("/")[1];
  req.body.file = `${uuid.v4()}.${extension}`;
  // now we resize
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(1000,jimp.AUTO);
  await photo.write(`./uploads/${req.body.file}`);

  console.log("resize :"+photo.file)
  // once we have written in out file system
  next();
}



 
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

  let product = new Product(req.body);

  try{
    await product.save(err=>{
      if(err){
        res.send("error")
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

 const url = req.protocol + '://' + req.get('host');

 const product =  await Product.find({_id: req.params.id});
  if(req.file == undefined){
    var file = product[0].file; 
  }
  else{
    var file = req.body.file
  }
   console.log("existing file :"+file)
 try{
  await Product.findOneAndUpdate({_id: req.params.id},
   {
    name: req.body.name,
    price:req.body.price,
    file: file,
    image:req.body.image,
    description:req.body.description
   }
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
