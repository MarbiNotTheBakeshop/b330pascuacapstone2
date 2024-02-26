const express = require("express");
const userControllers = require("../controllers/userControllers.js");

const auth = require('../auth.js');
const {verify, verifyAdmin} = auth;

// Router
const router = express.Router();

// Routes
router.get("/checkEmail", userControllers.checkEmailExists);

router.post("/register", userControllers.checkEmailExists, userControllers.registerUser);

router.post("/login", userControllers.loginUser);

router.get("/:userId", userControllers.getUserWithOrders);

module.exports = router;