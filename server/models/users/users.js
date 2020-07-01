// user schema for storing users

const mongo = require("mongo");
const mongoose = require("mongoose");

const { ObjectId, Number } = mongoose.Schema.Types;

const userSchema = mongoose.Schema({
 name:{
  type:String,
 },
 username:{
  type:String,
  required:true
 },
 password:{
  type: String,
  required:true
 },
 cartItems:[

   {

     quantity :{
         type : Number,
         default:1
      },
     product :{
      type: ObjectId,
      ref : 'Shop',
     }
   }

 ]
})


module.exports = userSchema;
