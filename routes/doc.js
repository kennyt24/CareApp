const express = require('express');


const{
    doctorSignup,doctorLogin,

} = require("../controler/doc.con")

const router = express.Router();


router.post('/SignupDoc', doctorSignup);
router.post('/loginDoctor', doctorLogin)

module.exports=router; 