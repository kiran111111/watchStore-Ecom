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
const PORT = 5000;

// Connect to the database with the function made--
connectDB();

// Middleware for the body Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())


app.use('/uploads', express.static('uploads'));

// app.use(jwt({ secret: jwtSecret }));
// cors module
const cors = require("cors")
app.use(cors())



// Route to expres router
app.use('/',router);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
 var err = new Error('Not Found');
 err.status = 404;
 next(err);
});


app.listen(PORT ,()=>{
 console.log(`App is running at port : ${PORT}`)
})
