const { addMenuItem, getMenu } = require("./controllers/menu");
const { addOrder, getOrders, getOrder } = require("./controllers/order");
const express = require("express");
const multer = require("multer");
const path = require("path");
const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const serviceAccount = require("../privatekey.json");

// const db = admin.database();

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder to save files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
    // e.g., 1234567890.jpg
  },
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const upload = multer({ storage: storage });

// Route to handle file uploads
app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file); // file info
  res.send({
    message: "File uploaded successfully!",
    file: req.file,
  });
});
// Create menu
app.post(
  "/menu",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "model", maxCount: 1 },
  ]),
  addMenuItem
);

// Get menu
app.get("/menu", getMenu);

app.post("/orders", addOrder);
app.get("/orders",getOrders);
app.get("/orders/:tNo", getOrder);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
