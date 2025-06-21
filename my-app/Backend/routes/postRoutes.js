const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');


// Define routes and attach controller logic
router.get("/", postController.getPosts);       
router.get("/:id", postController.getPostById);
module.exports = router;