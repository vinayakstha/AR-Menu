"use client"

import { useNavigate, useLocation } from "react-router-dom";
import styles from "./orderPlaced.module.css";

export default function OrderPlaced() {
  const navigate = useNavigate();
  const location = useLocation();

  // Previous order state passed from confirmOrder
  const orderData = location.state || {};

  const handleOrderComplete = () => {
    // Clear everything and go home
    navigate("/", { replace: true });
  };

  const handleOrderMore = () => {
    // Go home with existing order data
    navigate("/", {
      state: {
        previousOrder: orderData, // send back to Home/Menu
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.messageSection}>
          <h1 className={styles.mainHeading}>Yum!</h1>
          <p className={styles.subHeading}>Your order is in the works.</p>
        </div>

        <div className={styles.illustrationSection}>
          <div className={styles.illustration}>
            <svg className={styles.illustrationSvg} viewBox="0 0 200 300" fill="none">
              <ellipse cx="100" cy="80" rx="25" ry="20" fill="#ff7f7f" stroke="#ff6b6b" strokeWidth="2" />
              <ellipse cx="105" cy="75" rx="8" ry="6" fill="#ff9999" />
              <ellipse cx="95" cy="85" rx="6" ry="5" fill="#ff9999" />
              <line x1="100" y1="100" x2="100" y2="180" stroke="#8b4513" strokeWidth="3" />
              <path
                d="M70 180 Q65 190 70 200 L75 210 Q80 220 90 225 L110 225 Q120 220 125 210 L130 200 Q135 190 130 180 L125 175 Q120 170 110 170 L90 170 Q80 170 75 175 Z"
                fill="#ffd4c4"
                stroke="#ffb3a7"
                strokeWidth="2"
              />
              <ellipse cx="85" cy="185" rx="12" ry="18" fill="#ffd4c4" stroke="#ffb3a7" strokeWidth="2" />
              <ellipse cx="105" cy="175" rx="8" ry="15" fill="#ffd4c4" stroke="#ffb3a7" strokeWidth="2" />
              <ellipse cx="115" cy="175" rx="8" ry="15" fill="#ffd4c4" stroke="#ffb3a7" strokeWidth="2" />
              <ellipse cx="125" cy="180" rx="8" ry="12" fill="#ffd4c4" stroke="#ffb3a7" strokeWidth="2" />
            </svg>
          </div>
        </div>

        <div className={styles.buttonSection}>
          <button className={styles.orderCompleteButton} onClick={handleOrderComplete}>
            Order Complete
          </button>
          <button className={styles.orderMoreButton} onClick={handleOrderMore}>
            Order More
          </button>
        </div>
      </div>
    </div>
  );
}
