const express = require('express');
const router = express.Router();

const upload = require('../middlewares/multer');
const { uploadMedia } = require('../controllers/uploadController');

router.post("/", upload, uploadMedia);

module.exports = router;