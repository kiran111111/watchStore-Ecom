const mongo = require("mongo");
const mongoose = require("mongoose");
const express = require("express");

const db = "mongodb+srv://kiran:kiran@cluster0-zrsby.mongodb.net/test"
// process.env.MONGODB_URI;

mongoose.Promise = global.Promise;

const ConnectDB = async () =>{
 try{
   await mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true
   })
   console.log("Connected to MongoDB Database")
 }catch(err){
   if(err){
    console.log("Error occured while connecting")
    process.exit(1);
   }
 }
}

module.exports = ConnectDB;