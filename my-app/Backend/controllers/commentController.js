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

    const docRef = await db.collection("comments").add(commentData);

    res.status(201).json({
      id: docRef.id,
      ...commentData,
      createdAt: commentData.createdAt.toDate().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getComments = async (req, res) => {
  try {
    const snapshot = await db.collection("comments").orderBy("createdAt", "desc").get();

    const comments = snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate().toISOString()
      };
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateComment = async (req, res) => {
  const { id } = req.params;
  const { body } = req.body;

  try {
    const docRef = db.collection("comments").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Comment not found" });
    }

    await docRef.update({ body });
    res.status(200).json({ message: "Comment updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const docRef = db.collection("comments").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Comment not found" });
    }

    await docRef.delete();
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
