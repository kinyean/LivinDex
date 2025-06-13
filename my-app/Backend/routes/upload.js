const express = require('express');
const router = express.Router();

const upload = require('../middlewares/multer');
const { uploadMedia } = require('../controllers/uploadController');

router.post("/", upload.array("files", 8), uploadMedia);

module.exports = router;