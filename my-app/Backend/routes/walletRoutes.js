const express = require('express');
const router = express.Router();
const { updateTopUp, updateCashOut, updateLCoin ,getTransactions, addTransaction} = require('../controllers/walletController');

router.post('/topup', updateTopUp);      
router.post('/cashout', updateCashOut);
router.post('/lcoin', updateLCoin);      
router.get('/transactions/:uid', getTransactions);
router.post("/transactions", addTransaction); 

module.exports = router;
