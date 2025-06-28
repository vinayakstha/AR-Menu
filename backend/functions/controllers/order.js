const admin = require("firebase-admin");
const { db } = require("../firebase.js");
const { params } = require("firebase-functions");

const addOrder = async (req, res) => {
  try {
    const { tableNo, items } = req.body;

    // Validate required fields
    if (!tableNo || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ error: "Missing or invalid required fields" });
    }

    const ref = db.ref("orders");
    const newRef = ref.push(); // Auto-generates a unique key

    await newRef.set({
      tableNo,
      items,
      createdAt: Date.now(),
    });

    res.status(200).json({
      message: "Order successful",
      orderId: newRef.key,
    });
  } catch (error) {
    console.error("Error adding order:", error);
    res.status(500).json({ error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const db = admin.database();
    const snapshot = await db.ref("orders").once("value");
    const orders = [];
    snapshot.forEach((child) => {
      orders.push({ id: child.key, ...child.val() });
    });
    res.send(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).send(err.message);
  }
};

const getOrder = async (req, res) => {
  const tNo = parseInt(req.params.tNo, 10);
  if (isNaN(tNo)) {
    return res.status(400).send({ message: "Invalid table number" });
  }


  try {
    const db = admin.database();
    const snapshot = await db.ref("orders").once("value");
    let foundOrder = null;
    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.val();
      if (data.tableNo === tNo) {
        foundOrder = data;
      }
    });

    if (foundOrder) {
      res.send(foundOrder);
    } else {
      res.status(404).send({ message: "Order not found" });
    }
  } catch (err) {
    console.error("Error fetching order:", err);
    res.status(500).send(err.message);
  }
};

module.exports = { addOrder, getOrders, getOrder };
