import React from "react";
import { useContext } from "react";
import OrderContext from "./orderContext";
import styles from "./OrderBar.module.css";
import { useNavigate } from "react-router-dom";
function OrderBar() {
  const navigate = useNavigate();
  const { order, setOrder } = useContext(OrderContext);
  return (
    <div
      className={styles.container}
      onClick={() => {
        if(order.length === 0) {
          alert("No items in the order");
          return;
        }
        navigate("/confirmOrder");
      }}
    >
      <p>No of items:{order.reduce((total, item) => total + item.qty, 0)}</p>
      <p>Checkout</p>
      <p>
        Total: Rs.{" "}
        {order.reduce((total, item) => total + item.price * item.qty, 0)}
      </p>
    </div>
  );
}

export default OrderBar;
