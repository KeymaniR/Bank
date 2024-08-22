const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./Routes/userRoute');
const transactionRoute = require('./Routes/transactionRoute');


const app = express();
require("dotenv").config();


//Middleware functions
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/transactions", transactionRoute);



//CRUD
app.get("/", (req, res) => {
    res.send("Welcome to our Bank...");
});

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.listen(port, (req, res) => {
    console.log(`Server is running on port...: ${port}`);
});

mongoose.connect(uri, {

}).then(() => console.log("MongoDB connection established")).catch((error) => console.log("MongoDB connection failed: ", error.message));



