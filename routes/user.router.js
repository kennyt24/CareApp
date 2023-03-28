const express = require("express");
const router = express.Router();
const { userSignup } = require("../controler/user.con");
const { userLogin } = require("../controler/user.con");

// User Signup
router.post("/signup", userSignup);

// User Login
router.post("/login", userLogin);

module.exports = router;