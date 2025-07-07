const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');


// Define routes and attach controller logic
router.get("/user", postController.getPosts);       
router.get("/:id", postController.getPostById);
router.get("/", postController.getAllPosts); 
router.delete("/:id", postController.deletePostById);
router.patch("/:id", postController.editPostById);

module.exports = router;