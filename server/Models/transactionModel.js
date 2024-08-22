const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        userId: String,
        transType: String,
        description: String,
        begBalance: {type: Number, min: -999999, max: 999999, get: getPrice, set: setPrice, default: 0.00},
        endBalance: {type: Number, min: -999999, max: 999999, get: getPrice, set: setPrice, default: 0.00},
        difference: {type: Number, min: -999999, max: 999999, get: getPrice, set: setPrice, default: 0.00},
        transDate:  String
    },
    {
        timestamps: true
    }
)

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}


const transactionModel = mongoose.model("Transactions", transactionSchema)

module.exports = transactionModel;

