
const express = require("express");
const productController = require("../controllers/productControllers.js");


const router = express.Router();
const auth = require("../auth.js") 
const {verify, verifyAdmin} = auth;

// Routes



// router.get("/", productController.getAllActive);

router.post("/addProduct", verify, verifyAdmin, productController.addProduct);

router.get("/all", productController.getAllProducts);

router.get("/allActive", productController.getAllActive);

router.get("/:productId", productController.getProduct);

router.put("/:productId", productController.updateProduct);

router.put("/:productId/archive", verify, verifyAdmin, productController.archiveProduct);

router.put("/:productId/activate", verify, verifyAdmin, productController.activateProduct);

module.exports = router;