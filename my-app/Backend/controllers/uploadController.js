const admin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");

const bucket = admin.storage().bucket();
const firestore = admin.firestore();

exports.handleUpload = async (req, res) => {
  try {
    const file = req.file;
    const { text, userId, tags } = req.body;

    if (!file) return res.status(400).json({ message: "No file uploaded." });

    const fileName = `posts/${Date.now()}-${file.originalname}`;
    const token = uuidv4();
    const blob = bucket.file(fileName);

    await blob.save(file.buffer, {
      metadata: {
        contentType: file.mimetype,
        metadata: {
          firebaseStorageDownloadTokens: token,
        },
      },
    });

    const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media&token=${token}`;

    // Save metadata in Firestore
    const docRef = await firestore.collection("posts").add({
      text,
      userId,
      tags: JSON.parse(tags),
      mediaURL: downloadURL,
      mediaType: file.mimetype.startsWith("image") ? "image" : "video",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({
      message: "Upload successful",
      postId: docRef.id,
      downloadURL,
    });

  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};
