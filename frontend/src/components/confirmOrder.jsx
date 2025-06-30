import { useLocation, useNavigate } from "react-router-dom";
import styles from "./confirmOrder.module.css";

export default function ConfirmOrder() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const orderItems = state?.orderItems || [];
  const additionalItems = state?.additionalItems || [];
  const orderId = state?.orderId || 0;
  const description = state?.description || "";

  const calculateTotal = () => {
    const itemsTotal = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const additionalTotal = additionalItems.reduce((total, item) => total + item.price, 0);
    return itemsTotal + additionalTotal;
  };

  const confirmOrder = () => {
    // Navigate to OrderPlaced page
    navigate("/orderPlaced", {
      state: {
        orderId,
        total: calculateTotal(),
        description,
      },
    });
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={goBack}>←</button>
        <h1>Table 14 Order</h1>
        <div className={styles.headerSpacer}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.orderItemsSection}>
          {orderItems.map((item) => (
            <div key={item.id} className={styles.orderItemCard}>
              <div className={styles.itemImageContainer}>
                <img src={item.image || "/placeholder.svg"} alt={item.name} className={styles.itemImage} />
              </div>
              <div className={styles.itemDetails}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <p className={styles.itemPrice}>Rs. {item.price}</p>
                <p className={styles.itemQuantity}>Quantity: {item.quantity}</p>
              </div>
              <div className={styles.orderInfo}>
                <span className={styles.orderId}>Order Id: {orderId}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.middleSpacer}></div>

        <div className={styles.orderSummary}>
          {orderItems.map((item) => (
            <div key={item.id} className={styles.summaryRow}>
              <span className={styles.summaryLabel}>{item.name}</span>
              <span className={styles.summaryValue}>Rs. {item.price}</span>
            </div>
          ))}
          {additionalItems.map((item, index) => (
            <div key={index} className={styles.summaryRow}>
              <span className={styles.summaryLabel}>{item.name}</span>
              <span className={styles.summaryValue}>Rs. {item.price}</span>
            </div>
          ))}
          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>Total</span>
            <span className={styles.totalValue}>Rs. {calculateTotal()}</span>
          </div>
        </div>

        <button className={styles.confirmButton} onClick={confirmOrder}>
          Confirm Order
        </button>
      </div>
    </div>
  );
}
