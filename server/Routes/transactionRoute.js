const express = require("express");
const { createTransaction, getTransactions, getUpdatedBalance } = require("../Controllers/bankController");


const router = express.Router();

router.post("/", createTransaction);
router.get("/:userId", getTransactions);
router.get("/getUpdate/:userId", getUpdatedBalance)

module.exports = router;

