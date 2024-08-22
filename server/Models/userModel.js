const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String, 
            required : true,
             minLength: 3, 
             maxLength: 30,
             unique: true},
        email: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 200,
            unique: true,
        },
        password: {type: String, required: true, minLength: 3, maxLength: 1024},
        accountNum: {type: String, required: true},
        balance: {type: Number, min: 0, max: 999999, get: getPrice, set: setPrice, default: 0.00}
    },{
        timestamps: true,
    }
);

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;