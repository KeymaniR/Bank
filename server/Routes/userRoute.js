const express = require('express');
const { registerUser, loginUser, findUser, getUsers, updateBalance, forgotPassword, editInfo } = require("../Controllers/userController");

const router = express.Router();

//Create Registration Route
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.get("/", getUsers);
router.patch("/:userId", updateBalance);
router.patch("/edit/:userId", editInfo);
router.put("/forgot/:userId", forgotPassword);


module.exports = router;