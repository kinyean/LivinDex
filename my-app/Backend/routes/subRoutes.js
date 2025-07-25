const express = require('express');
const router = express.Router();
const subController = require('../controllers/subController');

// Define routes and attach controller logic
router.post('/', subController.subscribe);
router.delete('/', subController.unsubscribe);
router.get('/subscriptions/:userId', subController.getSubscriptions);
router.get('/followers/:userId', subController.getFollowers);
router.get("/liked/:userId", subController.getLikedPosts);
router.post("/like", subController.likePost);
router.post("/dislike", subController.dislikePost);
router.get("/likes/:postId/:userId", subController.hasUserLiked);
router.get("/dislikes/:postId/:userId", subController.hasUserDisliked);
router.post("/removeLike", subController.removeLike);     
router.post("/addDislike", subController.addDislike);
router.post("/removeDislike", subController.removeDislike);



  
module.exports = router;