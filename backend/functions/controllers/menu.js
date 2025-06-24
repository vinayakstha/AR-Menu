export const addMenuItem = async (req, res) => {
  try {
    const { category, name, price, desc, image, model } = req.body;
    //sabai fields cha ki nai validate garni
    if (
      !category ||
      !name ||
      !price ||
      !image | (!model === undefined) ||
      !desc
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const item = {
      name: name,
      price: price,
      desc: desc,
      image: image,
      model: model,
    };

    //req.body ko category database ma store cha ki nai check garni
    const categoryRef = db.ref(`menus/${category}`);
    const snapshot = await categoryRef.once("value");

    if (snapshot.exists()) {
      //yedi category already exists
      const existing = snapshot.val();
      const items = existing.items || [];
      items.push(item);
      await categoryRef.update({ items });
    } else {
      await categoryRef.set({
        items: [item],
      });
    }

    res.status(200).json({ message: "Menu item added successfully" });
  } catch (error) {
    console.error("Error adding menu item:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getMenu = async (req, res) => {
  {
    try {
      const snapshot = await db.ref("menus").once("value");
      const menus = [];
      snapshot.forEach((child) => {
        menus.push({ id: child.key, ...child.val() });
      });
      res.send(menus);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
};
