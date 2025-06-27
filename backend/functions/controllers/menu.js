const admin = require("firebase-admin");
const {db} = require("../firebase.js");
const addMenuItem = async (req, res) => {
  try {
    const {category, name, price, desc} = req.body;

    const imageFile = Array.isArray(req.files.photo) ?
    req.files.photo[0] : null;
    const modelFile = Array.isArray(req.files.model) ?
    req.files.model[0] : null;

    if (!category || !name || !price || !desc || !imageFile || !modelFile) {
      return res.status(400).json({error: "Missing required fields"});
    }

    const item = {
      name,
      price: parseFloat(price),
      desc,
      image: imageFile.path,
      model: modelFile.path,
      createdAt: new Date().toISOString(),
    };

    const categoryRef = db.ref(`menus/${category}`);
    const snapshot = await categoryRef.once("value");

    if (snapshot.exists()) {
      const existing = snapshot.val();
      const items = existing.items || [];
      items.push(item);
      await categoryRef.update({items});
    } else {
      await categoryRef.set({items: [item]});
    }

    res.status(200).json({message: "Menu item added successfully"});
  } catch (error) {
    console.error("Error adding menu item:", error);
    res.status(500).json({error: error.message});
  }
};

const getMenu = async (req, res) => {
  try {
    const db = admin.database();
    const snapshot = await db.ref("menus").once("value");
    const menus = [];
    snapshot.forEach((child) => {
      menus.push({id: child.key, ...child.val()});
    });
    res.send(menus);
  } catch (err) {
    console.error("Error fetching menu:", err);
    res.status(500).send(err.message);
  }
};

module.exports = {addMenuItem, getMenu};
