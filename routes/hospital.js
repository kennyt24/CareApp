const express = require('express');

const{
    hospitalSignup, verifyOtp,hospitallogin

} = require("../controler/hospital.con")

const router = express.Router();

router.post('/verify',verifyOtp);
router.post('/newhospital', hospitalSignup);
router.post('/loginhospital',hospitallogin);


module.exports=router; 