const { db } = require('../firebase');
const { Timestamp } = require('firebase-admin/firestore');

exports.createComment = async (req, res) => {
  const { body, username, userId, parentId } = req.body;

  try {
    const commentData = {
      body,
      username,
      userId,
      parentId: parentId || null,
      createdAt: Timestamp.now(),
    };

    const docRef = await db.collection('comments').add(commentData);
    res.status(201).json({ message: "Comment added", id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const snapshot = await db.collection('comments').orderBy('createdAt', 'desc').get();
    const comments = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  const commentId = req.params.id;

  try {
    await db.collection('comments').doc(commentId).delete();
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
