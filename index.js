if(process.env.NODE_ENV !== 'production'){
 require('dotenv').config()
}

const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
// Get router file 
const router = require("./router/routes")

// PORT
const PORT = process.env.PORT;

// Connect to the database with the function made--
connectDB();

// Middleware for the body Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())


// app.use('/api/uploads', express.static('uploads'));

// ADD THIS LINE
app.use(express.static('client/build'));

// cors module
const cors = require("cors")
app.use(cors())


// Route to expres router
app.use('/api',router);

// serve static assets if we are in production
if(process.env.NODE_ENV !== 'production'){
 // set a static folder
 app.use(express.static('client/build'))

 app.get("*",(req,res)=>{
   res.sendFile(path.resolve(__dirname,"client","build","index.html"))
 })
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
 var err = new Error('Not Found');
 err.status = 404;
 next(err);
});


app.listen(PORT ,()=>{
 console.log(`App is running at port : ${PORT}`)
})
