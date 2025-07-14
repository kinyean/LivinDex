const admin = require("firebase-admin");
const db = admin.firestore();

exports.createNotification = async (req, res) => {
  const { fromUserId, toUserId, postId, title, time, read, avatar } = req.body;

  try {
    const doc = await db.collection("notifications").add({
      fromUserId,
      toUserId,
      postId,
      title,
      time,
      read,
      avatar,
    });
    res.status(201).json({ id: doc.id });
  } catch (err) {
    console.error("Failed to create notification:", err);
    res.status(500).json({ error: "Failed to create notification" });
  }
};

exports.getNotifications = async (req, res) => {
  const { userId } = req.query;

  if (!userId) return res.status(400).json({ error: "Missing userId" });

  try {
    const snapshot = await db.collection("notifications")
      .where("toUserId", "==", userId)
      .orderBy("time", "desc")
      .get();

    const notifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(notifications);
  } catch (err) {
    console.error("Failed to fetch notifications:", err);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};
