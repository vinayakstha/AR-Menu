import { useLocation, useNavigate } from "react-router-dom";
import styles from "./confirmOrder.module.css";
import { useContext } from "react";
import OrderContext from "./orderContext";
import axios from "axios";
export default function ConfirmOrder() {
  const { order, setOrder } = useContext(OrderContext);
  const { state } = useLocation();
  const navigate = useNavigate();

  const calculateTotal = () => {
    const itemsTotal = order.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );

    return itemsTotal;
  };

  const confirmOrder = async () => {
    // Navigate to OrderPlaced page
    try {
      const response = await axios.post("http://localhost:3000/orders", {
        tableNo: 14,
        items: order,
      });
      navigate("/orderPlaced", {
      state: {
        orderId:response.orderId,
        total: calculateTotal(),
      },
    });
    } catch (error) {
      console.error(error); // handle error
    }

  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={goBack}>
          ←
        </button>
        <h1>Table 14 Order</h1>
        <div className={styles.headerSpacer}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.orderItemsSection}>
          {order.map((item) => (
            <div key={item.id} className={styles.orderItemCard}>
              <div className={styles.itemImageContainer}>
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className={styles.itemImage}
                />
              </div>
              <div className={styles.itemDetails}>
                <h3 className={styles.itemName}>{item.item}</h3>
                <p className={styles.itemPrice}>Rs. {item.price}</p>
                <p className={styles.itemQuantity}>Quantity: {item.qty}</p>
              </div>
              {/* <div className={styles.orderInfo}>
                <span className={styles.orderId}>Order Id: {orderId}</span>
              </div> */}
            </div>
          ))}
        </div>

        <div className={styles.middleSpacer}></div>

        <div className={styles.orderSummary}>
          {/* {order.map((item) => (
            <div key={item.id} className={styles.summaryRow}>
              <span className={styles.summaryLabel}>{item.name}</span>
              <span className={styles.summaryValue}>Rs. {item.price}</span>
            </div>
          ))} */}

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
