
const express = require('express');
const { auth } = require('../firebase.js'); 

const router = express.Router();

router.post('/register', async (req, res) => {
    const { uid, name } = req.body; //same as const uid = req.body.uid
    
    try {
        const userRecord = await auth.updateUser(uid, {
            displayName: name,
        })
        res.json({message: "User created and updated", user: userRecord.toJSON() });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

module.exports = router;