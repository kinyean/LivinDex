const express = require('express');
const router = express.Router();
const { updateTopUp, updateCashOut, updateLCoin } = require('../controllers/walletController');

router.post('/topup', updateTopUp);      
router.post('/cashout', updateCashOut);
router.post('/lcoin', updateLCoin);      

module.exports = router;
