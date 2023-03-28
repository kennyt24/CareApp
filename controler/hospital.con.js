const Hospital = require("../model/hospital");
const bcrypt = require("bcrypt");
const OTP = require("../utils /otp");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

exports.hospitalSignup = async (req, res, next) => {
    try {
        const { name, email, address, phone, password, additionalInformation} = req.body;
        if(!(name||email||address||phone||password)) {
            return res.status(400).json({message: "All fields must be provided"})
        };
        const checkHospital = await Hospital.findOne({email})
        if(checkHospital){
            return res.status(400).json({error: "Hospital already exist"});
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const hospital = await Hoapital.create({
            name, 
            email, 
            phone, 
            password: hash,
            otp:OTP,
        });
        let message = `${OTP}`;
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
            hospital: process.env.EMAIL,
            pass: process.env.PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Your verification otp',
            text: message,
             };
             transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Email verification error',error.message);
                }else {
                    console.log(
                        `${new Date().toLocaleString()} - Email sent successfully :` +
                        info.response
                    );
                }
            });
            return res.status(200).json({ message: "Email sent successfully",user});


    } catch (error) {
        res.status(500).json({message:error.message});
       console.log(error); 
        
    }
};

exports.verifyOtp = async (req,res) => {
    try {
        const { otp, hospitalId } = req.body;
        if (!(otp || hospitalId)) {
            return res.status(400).json({ message: "Incorrect otp" });
        }
        const hospital = await Hospital.findOne(hospitalId);
        if (!hospital) {
            return res.status(400).json({ message: "Hospital does not exist" });
        }
        const payload= ({
            hospitalId: user._id,
            otp: otp,
        });
       const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"10m"});
      return res.status(200).json({message:"user logged in successfully",token});

    } catch (error) {
        return res.status(500).json({error:error.message,messsage:"internal server error"});
    };

};

exports.hospitallogin = async (req, res) => {
    try {
      const { email, password} = req.body;
          if (!(email||password)){
              return res.status(400).json({message:"All fields are required"});   
          }
          const checkUser = await Hospital.findOne({ email });
          if (!checkUser) {
                      return res.status(400).json({ error: "User not found" });
          }
          const checkPassword = await bcrypt.compare(password, checkUser.password);
          if (!checkPassword) {
              return res.status(400).json({ error: "Password not match" });
              return;
          }
          //tokenize the password
          const payload=({
           hospitalId:hospital._id,
          });
          const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"10m"});
          return res
          .status(200).
          json({message:"Hospital logged in successfully",token});
      
    } catch (error) {
      console.log(error);
      return res
      .status(500)
      .json({error:error.message,messsage:"internal server  error"})
    }  
  };
  
