const { db } = require("../firebase");
const admin = require("firebase-admin");
const { Timestamp } = require("firebase-admin/firestore");

exports.getSubscriberAnalytics = async (req, res) => {
  const { creatorId } = req.params;

  const today = new Date();
  const start = new Date(today);
  start.setUTCDate(start.getUTCDate() - 14);
  start.setUTCHours(0, 0, 0, 0); 

  const startTimestamp = Timestamp.fromDate(start);
  try {
    const snapshot = await db.collection("subscriptions")
      .where("targetUserId", "==", creatorId)
      .where("createdAt", ">=", startTimestamp)
      .get();

    const rawSubs = snapshot.docs.map(doc => doc.data());

    const counts = {};
    for (let i = 0; i < 15; i++) {
      const d = new Date(start);
      d.setUTCDate(start.getUTCDate() + i); 
      const key = d.toISOString().slice(0, 10);
      counts[key] = 0;
    }

    rawSubs.forEach(({ createdAt }) => {
      const date = createdAt.toDate ? createdAt.toDate() : new Date(createdAt);
      const key = date.toISOString().slice(0, 10);

      if (counts[key] !== undefined) {
        counts[key]++;
      }
    });

    const result = Object.keys(counts).sort().map(date => ({
      x: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      }),
      y: counts[date]
    }));

    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.viewPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const postRef = db.collection("posts").doc(postId);
    const postSnap = await postRef.get();
    if (!postSnap.exists) return res.status(404).json({ error: "Post not found" });

    const postData = postSnap.data();

    await postRef.update({
      views: admin.firestore.FieldValue.increment(1),
    });

    const userId = postData.userId;
    const today = new Date().toISOString().split('T')[0];

    await db.collection("users").doc(userId).collection("analytics").doc(today).set({
      date: today,
      views: admin.firestore.FieldValue.increment(1),
    }, { merge: true });

    await db.collection("users").doc(userId).update({
      view: admin.firestore.FieldValue.increment(1),
    });

    res.status(200).json({ message: "View recorded" });
  } catch (err) {
    console.error("Error recording view:", err);
    res.status(500).json({ error: "Failed to record view" });
  }
};


exports.getViewAnalytics = async (req, res) => {
  const { userId } = req.params;

  const today = new Date();
  const start = new Date(today);
  start.setUTCDate(start.getUTCDate() - 14);
  start.setUTCHours(0, 0, 0, 0);

  try {
    const snapshot = await db
      .collection("users")
      .doc(userId)
      .collection("analytics")
      .get();

    const rawViews = snapshot.docs
      .map(doc => ({
        date: doc.id,
        views: doc.data().views || 0,
      }))
      .filter(doc => {
        const docDate = new Date(doc.date + "T00:00:00Z");
        return docDate >= start;
      });
      
    const counts = {};
    for (let i = 0; i < 15; i++) {
      const d = new Date(start);
      d.setUTCDate(start.getUTCDate() + i);
      const key = d.toISOString().slice(0, 10);
      counts[key] = 0;
    }

    rawViews.forEach(({ date, views }) => {
      if (counts[date] !== undefined) {
        counts[date] += views;
      }
    });

    const result = Object.keys(counts).sort().map(date => ({
      x: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      }),
      y: counts[date]
    }));

    return res.json(result);
  } catch (err) {
    console.error("Error getting views:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
