import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./addOrder.module.css";
import vegMomo from "../assets/images/vegMomo.png";
import { useLocation } from "react-router-dom";
export default function AddOrder() {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { item } = location.state; // get the item passed via navigate()

  const itemData = item;

  const defaultPrices = {
    water: 0,
    coke: 80,
    "coca cola": 80,
    sprite: 80,
    fanta: 80,
    juice: 100,
    tea: 30,
    coffee: 60,
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const parseAdditionalItems = (descText) => {
    if (!descText.trim()) return [];

    const items = [];
    const parts = descText.split(",");
    for (let part of parts) {
      const name = part.trim().toLowerCase();
      if (name) {
        const displayName = name.charAt(0).toUpperCase() + name.slice(1);
        const price = defaultPrices[name] ?? 0;
        items.push({ name: displayName, price });
      }
    }
    return items;
  };

  const addToOrder = () => {
    const additionalItems = parseAdditionalItems(description);
    navigate("/confirmOrder", {
      state: {
        orderItems: [
          {
            id: itemData.id,
            name: itemData.name,
            price: itemData.price,
            quantity: quantity,
            image: itemData.image,
          },
        ],
        description,
        additionalItems,
        orderId: 1,
      },
    });
  };

  const goBack = () => window.history.back();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={goBack}>
          ←
        </button>
        <h1>Table 14 Menu</h1>
        <div className={styles.headerSpacer}></div>
      </div>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search Items..."
          className={styles.searchInput}
        />
        <span className={styles.searchIcon}>🔍</span>
      </div>

      <div className={styles.content}>
        <div className={styles.orderCard}>
          <div className={styles.itemInfoSection}>
            <div className={styles.itemImageContainer}>
              <img
                src={itemData.image || "/placeholder.svg"}
                alt={itemData.name}
                className={styles.itemImage}
              />
            </div>
            <div className={styles.itemDetails}>
              <h2 className={styles.itemName}>{itemData.name}</h2>
              <p className={styles.itemPrice}>Rs. {itemData.price}</p>
              <p className={styles.itemCategory}>{itemData.category}</p>
              <p className={styles.itemDescription}>{itemData.description}</p>
            </div>
          </div>

          <div className={styles.quantitySection}>
            <h3 className={styles.sectionTitle}>Quantity</h3>
            <div className={styles.quantityControls}>
              <button
                className={styles.quantityButton}
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                −
              </button>
              <span className={styles.quantityDisplay}>{quantity}</span>
              <button
                className={styles.quantityButton}
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>
          </div>

          <div className={styles.descriptionSection}>
            <h3 className={styles.sectionTitle}>Additional Items (Optional)</h3>
            <textarea
              className={styles.descriptionInput}
              placeholder="e.g., Water, Coke, Juice"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <button className={styles.addToOrderButton} onClick={addToOrder}>
            Add to Order
          </button>
        </div>
      </div>
    </div>
  );
}
