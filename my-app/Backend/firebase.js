
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');

const serviceAccount = require('./firebaseServiceAccountKey.json');

initializeApp({
    credential: cert(serviceAccount)
});

const auth = getAuth();
const db = getFirestore(); 

module.exports = { auth, db };