const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const { reset } = require('nodemon');

const createToken  = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;

    return jwt.sign({_id}, jwtkey, {expiresIn: "3d"}); //Creating a token
}

const generateAccountNum = () => {
    const accountNum = Math.floor(100000 + Math.random() * 90000000000000)
    return accountNum;
}

const registerUser = async(req, res) => {

    try{
        const {userName, email, password} = req.body;
        const {balance} = 0.00;
        
        let user = await userModel.findOne({email}); //We communicate with another class so we will use await here while it gets that info

        user = await userModel.findOne({userName});

        if(user)
            return res.status(400).json("User already exists");//Check if user exists

        if(!userName || !email || !password)
            return res.status(400).json("All fields are required"); 

        if(!validator.isEmail(email))
            return res.status(400).json("Email must be a valid email");

        if(!validator.isStrongPassword(password))
            return res.status(400).json("Password must at least be 8 characters long, at least 1 lowercase and 1 uppercase character, 1 numeric character, and 1 symbol.");

        const accountNum = generateAccountNum();

        user = new userModel({userName, email, password, accountNum, balance});//Since its a new one go ahead and make a new user.

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(user.password, salt);

        user.balance = 0.00;

        await user.save();

        const token = createToken(user._id); //The token is going to be the password of the current user

        res.status(200).json({_id: user._id, userName, email, token, accountNum, balance});

    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const loginUser = async(req, res) => {
    //Always start with checks on the user if they exist or not

    const {userName, password} = req.body;

    try{
        let user = await userModel.findOne({userName});

        if(!user)
            return res.status(400).json("Invalid username or password");

        //console.log(password);
       // console.log(user.password);

        const isValidPassword = await bcrypt.compare(password, user.password); //Compare the password entered with the password found in the database

        if(!isValidPassword) return res.status(400).json("Invalid username or password");

        const token = createToken(user._id);

        res.status(200).json({_id: user._id, userName: user.userName, email: user.email, token, accountNum: user.accountNum, balance: user.balance});

    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const findUser = async(req, res) =>{
    const userId = req.params.userId; //This means you will be getting this parameter from the link itself

    try{
        const user = await userModel.findById(userId);

        res.status(200).json(user);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const getUsers = async(req, res) =>{ //Get all users in the database

    try{
        const users = await userModel.find();

        res.status(200).json(users);
        
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};


const updateBalance = async(req, res) => {

    const userId = req.params.userId;

    const {balance} = req.body;

    const userInfo = await userModel.findById(userId);

    if(!userInfo) return res.status(404).send("User Not Found...");

    try{
        const updateBalance = await userModel.findByIdAndUpdate({_id: userId}, {
            balance: balance
        });

        const updatedUser = await userModel.findById(userId);

        res.status(200).json({_id: updatedUser._id, userName: updatedUser.userName, email: updatedUser.email, password: updatedUser.password, accountNum: updatedUser.accountNum, balance: updatedUser.balance});

    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }

}

    const forgotPassword = async(req, res) => {

    const {newPass} = req.body;
    const userId = req.params.userId;

    console.log("here");

    const userInfo = await userModel.findById(userId);

    if(!userInfo) return res.status(404).send("User Not Found...");

    if(!validator.isStrongPassword(newPass))
        return res.status(400).json("Password must at least be 8 characters long, at least 1 lowercase and 1 uppercase character, 1 numeric character, and 1 symbol.");

    try{
        const updatePassword = await userModel.findByIdAndUpdate({_id: userInfo._id},
            {
                password: newPass
            }
        );

        const salt = await bcrypt.genSalt(10);

        updatePassword.password = await bcrypt.hash(updatePassword.password, salt);

        await updatePassword.save();
    
        const token = createToken(updatePassword._id);

        const updatedUser = await userModel.findById(updatePassword._id);

        console.log(updatedUser.password);

        res.status(200).json({_id: updatedUser._id, userName: updatedUser.userName, email: updatedUser.email, token, password: updatedUser.password, accountNum: updatedUser.accountNum, balance: updatedUser.balance});

    }catch(error){
        console.log(error);
        res.status(500).json(error);

    }

    }

    const editInfo = async(req, res) => {
        //Grab the edited info from the body
        const userId = req.params.userId;
        const {userName, email} = req.body

        //Check that the user exists based on user id

        const userInfo = await userModel.findById(userId);

        
        if(!userInfo) return res.status(404).send("User Not Found...");

        //Update the database with new inputted info

        try{
            const updateUser = await userModel.findByIdAndUpdate({_id: userId},{
                userName: userName,
                email: email
            });

            const updatedUser = await userModel.findById(userId);

            res.status(200).json({_id: updatedUser._id, userName: updatedUser.userName, email: updatedUser.email, password: updatedUser.password, accountNum: updatedUser.accountNum, balance: updatedUser.balance});
        }
        catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    }

module.exports = { registerUser, loginUser, findUser, getUsers, updateBalance, forgotPassword, editInfo };




