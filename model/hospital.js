const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
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
    required: true
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
module.exports = mongoose.model("hospital", HospitalSchema);
