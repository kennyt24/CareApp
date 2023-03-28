const mongoose = require("mongoose");


const initiateMongoServer= async()=>{
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.MONGODB_URI,()=>{
        console.log("Connected to Db");
    });
};

module.exports = initiateMongoServer;
