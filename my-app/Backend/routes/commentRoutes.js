const express = require('express');
const router = express.Router();
const {
  createComment,
  getComments,
  deleteComment,
} = require('../controllers/commentController');

// Define routes and attach controller logic
router.post('/', createComment);
router.get('/', getComments);
router.delete('/:id', deleteComment);

module.exports = router;
