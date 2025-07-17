const { db } = require("../firebase");
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
