const admin = require("firebase-admin");

exports.updateTopUp = async (req, res) => {
  const { uid, amount } = req.body;

  if (!uid || typeof amount !== "number" || amount < 1 || amount > 999) {
    return res.status(400).json({ error: "Invalid top-up amount" });
  }

  try {
    const userRef = admin.firestore().collection("users").doc(uid);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const currentBalance = doc.data().SGD || 0;
    const amountInCents = Math.round(amount * 100);
    const updatedBalance = currentBalance + amountInCents;

    await userRef.update({ SGD: updatedBalance });

    await admin.firestore().collection("transactions").add({
      uid,
      type: "Top Up",
      amount: amountInCents,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.status(200).json({
      uid: doc.id,
      newBalance: updatedBalance,
      message: `Topped up $${amount}`,
    });
  } catch (err) {
    console.error("Top-up error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateCashOut = async (req, res) => {
  const { uid, amount } = req.body;

  if (!uid || typeof amount !== "number" || amount <= 0 || amount > 999.99) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  try {
    const userRef = admin.firestore().collection("users").doc(uid);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const currentSGD = doc.data().SGD || 0;
    const amountInCents = Math.round(amount * 100);

    if (currentSGD < amountInCents) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    const newBalance = currentSGD - amountInCents;

    await userRef.update({ SGD: newBalance });

    await admin.firestore().collection("transactions").add({
      uid,
      type: "Cash Out",
      amount: amountInCents,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.status(200).json({ newBalance });
  } catch (err) {
    console.error("Cash out error:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.updateLCoin = async (req, res) => {
  const { uid, delta } = req.body;

  if (!uid || typeof delta !== "number") {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const userRef = admin.firestore().collection("users").doc(uid);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const currentLCoin = doc.data().LCoin || 0;
    const updatedLCoin = currentLCoin + delta;

    if (updatedLCoin < 0) {
      return res.status(400).json({ error: "Insufficient LCoins" });
    }

    await userRef.update({ LCoin: updatedLCoin });

    res.status(200).json({
      uid: doc.id,
      newLCoin: updatedLCoin,
      message: `${delta > 0 ? "Added" : "Redeemed"} ${Math.abs(delta)} LCoins`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTransactions = async (req, res) => {
  const { uid } = req.params;

  try {
    const snapshot = await admin.firestore()
      .collection("transactions")
      .where("uid", "==", uid)
      .orderBy("createdAt", "desc")
      .get();

      const transactions = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() ?? null
        };
      });

    res.status(200).json({ transactions });
  } catch (err) {
    console.error("Get transactions error:", err);
    res.status(500).json({ error: err.message });
  }
};

