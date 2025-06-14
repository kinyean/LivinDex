const express = require('express');
const router = express.Router();
const { updateTopUp, updateCashOut, updateLCoin ,getTransactions} = require('../controllers/walletController');

router.post('/topup', updateTopUp);      
router.post('/cashout', updateCashOut);
router.post('/lcoin', updateLCoin);      
router.get('/transactions/:uid', getTransactions);

module.exports = router;
