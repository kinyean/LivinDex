const { db } = require('../firebase');

// Create user profile
exports.createUser = async (req, res) => {
  const { uid, firstName, lastName, phone, bio, SGD, LCoin, like, following, subscriber,firstRewardUsed } = req.body;

  try {
    const userData = {
      firstName,
      lastName,
      phone,
      bio,
      SGD,
      LCoin,
      like,
      following, 
      subscriber,
      firstRewardUsed
    };

    await db.collection("users").doc(uid).set(userData);
    res.status(201).json({ message: "User profile created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user profile
exports.getUser = async (req, res) => {
  const { uid } = req.params;

  try {
    const doc = await db.collection("users").doc(uid).get();
    if (!doc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ uid: doc.uid, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user profile
exports.updateUser = async (req, res) => {
  const { uid } = req.params;
  const newData = req.body;

  try {
    await db.collection("users").doc(uid).update(newData);
    res.status(200).json({ message: "User profile updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
