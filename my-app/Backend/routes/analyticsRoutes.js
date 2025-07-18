const express = require("express");
const router = express.Router();
const { getSubscriberAnalytics,
        getViewAnalytics,
        viewPost, } = require("../controllers/analyticsController");

router.get("/subscribers/:creatorId", getSubscriberAnalytics);
router.get("/views/:userId", getViewAnalytics);
router.post("/post/view/:postId", viewPost);

module.exports = router;
