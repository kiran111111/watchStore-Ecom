const mongo = require('mongo');
const mongoose = require("mongoose");



const productSchema = new mongoose.Schema({
  name:{
    type:String,
    trim:true,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  image:{
    type:Object,
   required:true
 },
 file:{
  type:Object
 },
  description:{
   type:String,
   trim:true,
   lowercase:true,
   required:true
  },
  date:{
    type:Date,
    default:Date.now()
 }
})


module.exports = mongoose.model('Shop',productSchema);