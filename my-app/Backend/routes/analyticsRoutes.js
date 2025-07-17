const express = require("express");
const router = express.Router();
const { getSubscriberAnalytics } = require("../controllers/analyticsController");

router.get("/subscribers/:creatorId", getSubscriberAnalytics);

module.exports = router;
