const { v4: uuidv4 } = require("uuid");
const admin = require("firebase-admin");
const db = admin.firestore();
const bucket = admin.storage().bucket();

exports.uploadMedia = async (req, res) => {
  try {

    const { header, text, userId, tags, uploadType, like, dislike } = req.body;
    const files = req.files?.files; // Array of files

    const thumbnail = req.files?.thumbnail?.[0]; // expect single thumbnail

    if (!thumbnail) {
      return res.status(400).json({ error: "Thumbnail is required" });
    }
    
    if (!Array.isArray(files)) {
      return res.status(400).json({ error: "No valid files uploaded" });
    }

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }
    if (uploadType === "video" && files.length > 1) {
        return res.status(400).json({ error: "Only one video is allowed." });
    }

    if (uploadType === "image" && files.length > 8) {
        return res.status(400).json({ error: "Up to 8 images are allowed." });
    }

    const uploadedMedia = [];
    const storagePath = [];

    for (const file of files) {
      const ext = file.originalname.split(".").pop();
      const downloadToken = uuidv4();
      const filename = `${Date.now()}-${downloadToken}.${ext}`;
      const path = `posts/${filename}`;
      storagePath.push(path);
      const blob = bucket.file(path);

       

      await blob.save(file.buffer, {
        metadata: {
          contentType: file.mimetype,
          metadata: {
            firebaseStorageDownloadTokens: downloadToken,
          },
        },
      });

      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media&token=${downloadToken}`;

      uploadedMedia.push({
        mediaURL: publicUrl,
        mediaType: file.mimetype.startsWith("image") ? "image" : "video",
      });
    }

    const thumbnailDownloadToken = uuidv4();
    const thumbExt = thumbnail.originalname.split(".").pop();
    const thumbFilename = `thumbnails/${Date.now()}-${thumbnailDownloadToken}.${thumbExt}`;
    const thumbBlob = bucket.file(thumbFilename);

    await thumbBlob.save(thumbnail.buffer, {
      metadata: {
        contentType: thumbnail.mimetype,
        metadata: {
          firebaseStorageDownloadTokens: thumbnailDownloadToken,
        },
      },
    });

    const thumbnailURL = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(thumbBlob.name)}?alt=media&token=${thumbnailDownloadToken}`;


    const docRef = await db.collection("posts").add({
      header,
      like,
      dislike,
      text,
      userId,
      storagePath,
      tags: JSON.parse(tags),
      media: uploadedMedia, 
      thumbnailURL,
      thumbnailPath: thumbFilename,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ message: "Post uploaded", postId: docRef.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upload" });
  }
};
