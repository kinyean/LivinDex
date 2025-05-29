const express = require('express');
const router = express.Router();
const {
  createUser,
  getUser,
  updateUser,
} = require('../controllers/userController');

// Define routes and attach controller logic
router.post('/', createUser);        
router.get('/:uid', getUser);         
router.put('/:uid', updateUser);     

module.exports = router;
