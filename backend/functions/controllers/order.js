export const addOrder = async (req, res) => {
  try {
    const { tableNo, items } = req.body;
    //sabai fields cha ki nai validate garni
    if (!tableNo || !items === undefined || !desc) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const ref = db.ref("orders");
    const newRef = ref.push(); // auto-generates a unique key

    await newRef.set({
      tableNo: tableNo,
      items: items,
      createdAt: Date.now(),
    });

    res.status(200).json({ message: "Order succesfull" });
  } catch (error) {
    console.error("Error adding menu item:", error);
    res.status(500).json({ error: error.message });
  }
};
