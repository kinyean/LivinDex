const { db } = require('../firebase');
const { FieldValue } = require('firebase-admin/firestore');

// Follow a user
exports.subscribe = async (req, res) => {
  const { userId, targetUserId } = req.body;

  if (!userId || !targetUserId || userId === targetUserId) {
    return res.status(400).json({ error: "Invalid subscription request" });
  }

  try {
    const subRef = db.collection("subscriptions").doc(`${userId}_${targetUserId}`);
    await subRef.set({
      userId,
      targetUserId,
      createdAt: new Date()
    });

    const userRef = db.collection("users").doc(targetUserId);
    await userRef.update({
      subscriber: FieldValue.increment(1)
    });

    res.status(200).json({ message: "Subscribed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Unfollow a user
exports.unsubscribe = async (req, res) => {
  const { userId, targetUserId } = req.body;

  if (!userId || !targetUserId || userId === targetUserId) {
    return res.status(400).json({ error: "Invalid unsubscription request" });
  }

  try {
    const subRef = db.collection("subscriptions").doc(`${userId}_${targetUserId}`);
    await subRef.delete();

    const userRef = db.collection("users").doc(targetUserId);
    await userRef.update({
      subscriber: FieldValue.increment(-1)
    });

    res.status(200).json({ message: "Unsubscribed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users this user is following
exports.getSubscriptions = async (req, res) => {
  const { userId } = req.params;
  
  try {
    const snapshot = await db.collection("subscriptions").where("userId", "==", userId).get();
    const subscriptions = snapshot.docs.map(doc => doc.data().targetUserId);
    res.status(200).json({ subscriptions });
  } catch (err) {
    console.error("Error fetching subscriptions:", err);
    res.status(500).json({ error: err.message });
  }
};


// Get all followers of a user
exports.getFollowers = async (req, res) => {
  const { userId } = req.params;

  try {
    const snapshot = await db.collection("subscriptions").where("targetUserId", "==", userId).get();
    const followers = snapshot.docs.map(doc => doc.data().userId);
    res.status(200).json({ followers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
