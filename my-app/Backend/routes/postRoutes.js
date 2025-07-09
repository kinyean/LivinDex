const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');


// Define routes and attach controller logic
router.get("/user", postController.getPosts);       
router.get("/:id", postController.getPostById);
router.get("/", postController.getAllPosts); 
router.delete("/:id", postController.deletePostById);
router.patch("/:id", postController.editPostById);
router.post("/:postId/like", postController.likePost);
router.post("/:postId/dislike", postController.dislikePost);


module.exports = router;