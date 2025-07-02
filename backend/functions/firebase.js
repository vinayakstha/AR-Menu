// firebase.js
const admin = require("firebase-admin");
const serviceAccount = require("../privatekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://armenu-ef987-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

const db = admin.database();

module.exports = { admin, db };