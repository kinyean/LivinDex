const express = require('express');
const router = express.Router();

const upload = require('../middlewares/multer');
const { handleUpload } = require('../controllers/uploadController');

router.post('/', upload.single('file'), handleUpload);

module.exports = router;