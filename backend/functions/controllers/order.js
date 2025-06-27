const admin = require("firebase-admin");
const {db} = require("../firebase.js");

const addOrder = async (req, res) => {
  try {
    const {tableNo, items} = req.body;

    // Validate required fields
    if (!tableNo || !Array.isArray(items) || items.length === 0) {
      return res
          .status(400)
          .json({error: "Missing or invalid required fields"});
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
    res.status(500).json({error: error.message});
  }
};

module.exports = {addOrder};
