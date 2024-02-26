const express = require("express");
const cartControllers = require("../controllers/cartControllers.js");

// Router
const router = express.Router();

const auth = require('../auth.js');

// Routes
// router.post("/addToCart", cartControllers.addToCart);
// router.post("/createCart", verify, verifyAdmin, cartControllers.createCart);


router.post("/addToCart", cartControllers.addToCart);
router.get("/orders/:userId", cartControllers.getOrdersSummary);

module.exports = router;