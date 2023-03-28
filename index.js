require ("dotenv").config();

const express = require('express');
const app = express();
const initiateMongoServer = require("./config/datbase")
const hospitalRoute = require("./routes/hospital")
const doctorRoute = require("./routes/doc")
const userRoute = require("./routes/user.router")
//port
const port = process.env.port||4500;
initiateMongoServer();
app.use(express.json());
app.use('/api',hospitalRoute);
app.use('/api', doctorRoute);
app.use('/api', userRoute);



app.get("/", (req, res) => {
    res.send("App is working")

});

app.listen(port, (req, res) => {
    console.log(`Server listening on ${port}`)
});