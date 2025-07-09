const express = require('express');
const multer = require("multer");

// In-memory storage
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const isImage = file.mimetype.startsWith("image/");
  const isVideo = file.mimetype.startsWith("video/");
  const { uploadType } = req.query;

  if (file.fieldname === "thumbnail") {
    // Thumbnail must be an image regardless of uploadType
    if (isImage) return cb(null, true);
    return cb(new Error("Thumbnail must be an image."), false);
  }

  // Handle media files
  if ((uploadType === "image" && isImage) || (uploadType === "video" && isVideo)) {
    return cb(null, true);
  }

  cb(new Error("Invalid file type for this upload type."), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // Max file size per file
    files: 9, // 8 media files + 1 thumbnail max
  },
});

// Exporting .fields() setup to handle both media and thumbnail
module.exports = upload.fields([
  { name: "files", maxCount: 8 }, // for main images/videos
  { name: "thumbnail", maxCount: 1 }, // for the thumbnail image
]);
