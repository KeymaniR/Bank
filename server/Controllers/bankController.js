const transactionModel = require("../Models/transactionModel");
const userModel = require("../Models/userModel");

const createTransaction = async(req, res) =>{

    const {userId, transType, description, begBalance, endBalance, difference, transDate} = req.body
    
    const transaction = new transactionModel({
        userId, transType, description, begBalance, endBalance, difference, transDate
    })

    try{
        const response = await transaction.save();

        res.status(200).json(response);

}catch(error){
    console.log(error);
    res.status(500).json(error);
}}

const getTransactions = async(req, res) => {

    const {userId} = req.params;

    try{
        const transaction = await transactionModel.find({userId});

        res.status(200).json(transaction);


    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }

}

const getUpdatedBalance = async(req, res) => {

    const userId = req.params.userId;

    try{
        const balance = await userModel.findById(userId);
        res.status(200).json(balance.balance);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }

}


module.exports = { createTransaction, getTransactions, getUpdatedBalance };