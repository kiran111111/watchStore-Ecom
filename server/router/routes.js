const express = require("express");
const router = express.Router();
// get all the routes
const authController = require("../controllers/authController");
const productController = require("../controllers/productController");


// Get the basic product functionality
router.get("/",productController.getProducts);
router.post("/add",productController.upload,productController.createProduct)
router.post("/edit/:id",productController.upload,productController.editProduct);
router.get("/delete/:id",productController.deleteProduct);

// Get the authentication routes
router.get("/currentUser",authController.verifyToken,authController.getCurrentUser)
router.post("/register",authController.registerUser)
router.post("/login",authController.loginUser)
router.get("/logout",authController.logoutUser)

router.post("/addItemToCart",authController.verifyToken,authController.addItemToCart)


router.get("/getProducts",authController.verifyToken,authController.getProducts)
router.post("/deleteProduct",authController.verifyToken,authController.deleteProduct)

module.exports = router;
 