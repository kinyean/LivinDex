const express = require('express');
const multer = require("multer");

// In-memory storage
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const isImage = file.mimetype.startsWith("image/");
  const isVideo = file.mimetype.startsWith("video/");
   const { uploadType } = req.query;

  if ((uploadType === "image" && isImage) || (uploadType === "video" && isVideo)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type for this upload type."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 20MB per file
    files: 8,
  },
});

module.exports = upload;
