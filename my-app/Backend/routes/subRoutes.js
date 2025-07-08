const express = require('express');
const router = express.Router();
const subController = require('../controllers/subController');

// Define routes and attach controller logic
router.post('/', subController.subscribe);
router.delete('/', subController.unsubscribe);
router.get('/subscriptions/:userId', subController.getSubscriptions);
router.get('/followers/:userId', subController.getFollowers);

module.exports = router;