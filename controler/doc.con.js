const Doctor= require("../model/doctor.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.doctorSignup = async (req, res, next) => {
    try {
        const { name, email, address, phone, password, additionalInformation} = req.body;
        if(!(name||email||address||phone||password)) {
            return res.status(400).json({message: "All fields must be provided"})  
        };
        const checkDoctor = await Doctor.findOne({email})
        if(checkHospital){
            return res.status(400).json({error: "Hospital already exist"});
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const hospital = await Doctor.create({
            name, 
            email, 
            phone, 
            password: hash,
            additionalInformation,
        });


    } catch (error) {
        res.status(500).json({message:error.message});
       console.log(error); 
    }

};


exports.doctorLogin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      // Check if email and password are provided
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
  
      // Check if the doctor exists in the database
      const doctor = await Doctor.findOne({ email });
      if (!doctor) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      // Check if the password is correct
      const isMatch = await bcrypt.compare(password, doctor.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      // Create and sign a JWT token
      const payload = {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error);
    }
  };


