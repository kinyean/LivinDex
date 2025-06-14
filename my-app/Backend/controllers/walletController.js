const admin = require("firebase-admin");

exports.updateTopUp = async (req, res) => {
  const { uid, amount } = req.body;

  if (!uid || typeof amount !== "number" || amount < 1 || amount > 999) {
    return res.status(400).json({ error: "Invalid top-up amount" });
  }

  try {
    const userRef = admin.firestore().collection("users").doc(uid);
    const docSnap = await userRef.get();

    if (!docSnap.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const currentBalance = docSnap.data().SGD || 0;
    const updatedBalance = currentBalance + amount * 100;

    await userRef.update({ SGD: updatedBalance });

    res.status(200).json({
      uid: docSnap.id,
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
    const docSnap = await userRef.get();

    if (!docSnap.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const currentSGD = docSnap.data().SGD || 0;
    const amountInCents = Math.round(amount * 100);

    if (currentSGD < amountInCents) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    const newBalance = currentSGD - amountInCents;

    await userRef.update({ SGD: newBalance });

    await admin.firestore().collection("transactions").add({
      uid,
      type: "cashout",
      amount: -amountInCents,
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
    const docSnap = await userRef.get();

    if (!docSnap.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const currentLCoin = docSnap.data().LCoin || 0;
    const updatedLCoin = currentLCoin + delta;

    if (updatedLCoin < 0) {
      return res.status(400).json({ error: "Insufficient LCoins" });
    }

    await userRef.update({ LCoin: updatedLCoin });

    res.status(200).json({
      uid: docSnap.id,
      newLCoin: updatedLCoin,
      message: `${delta > 0 ? "Added" : "Redeemed"} ${Math.abs(delta)} LCoins`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

