import { addMenuItem, getMenu } from "./controllers/menu";
import { addOrder } from "./controllers/order";
const express = require("express");
const multer = require("multer");
const path = require("path");

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const serviceAccount = require("../privatekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://armenu-ef987.firebaseio.com",
});

const db = admin.database();

// Create menu
app.post("/menu", addMenuItem);

// Get menu
app.get("/menu", getMenu);

app.post("order", addOrder);

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder to save files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // e.g., 1234567890.jpg
  },
});

const upload = multer({ storage: storage });

// Route to handle file uploads
app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file); // file info
  res.send({
    message: "File uploaded successfully!",
    file: req.file,
  });
});

// Start the server
app.listen(3000, () => console.log("Server running on port 3000"));

// ✅ Export as a Firebase Function
exports.api = onRequest(app);
