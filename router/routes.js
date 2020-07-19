const express = require("express");
const router = express.Router();
const path = require("path")
// get all the routes
const authController = require("../controllers/authController");
const productController = require("../controllers/productController");
// get the validation methods
const {userValidationRules,validate} = require("../helpers/validator")


// If no API routes are hit, send the React app
// router.use(function(req, res) {
// 	res.sendFile(path.join(__dirname, "../../client/build/index.html"));
// });



// Get the basic product functionality
router.get("/",productController.getProducts);
router.post("/add",productController.uploads,productController.resize,productController.createProduct)
router.post("/edit/:id",productController.uploads,productController.resize,productController.editProduct);
router.get("/delete/:id",productController.deleteProduct);

// Get the authentication routes
router.get("/currentUser",authController.verifyToken,authController.getCurrentUser)
router.post("/register",userValidationRules(),validate,authController.registerUser)
router.post("/login",authController.loginUser)
router.get("/logout",authController.logoutUser)

// product routes (CRUD)
router.post("/addItemToCart",authController.verifyToken,authController.addItemToCart)
router.get("/getProducts",authController.verifyToken,authController.getProducts)
router.post("/deleteProduct",authController.verifyToken,authController.deleteProduct)

module.exports = router;
 