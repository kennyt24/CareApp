const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: false,
    unique: true
  },
  
  address: {
    type: String,
    required: false
  },

  additionalinformation: {
    type: String,
    required: false
  },
  
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// export model user with UserSchema
module.exports = mongoose.model("doctor", DoctorSchema);
