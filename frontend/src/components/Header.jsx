// Header.jsx
import styles from "./Header.module.css";

export default function Header({ onARClick }) {
  return (
    <>
      {/* Header with AR Button */}
      <div className={styles.header}>
        <h1>Table 14 Menu</h1>
        <button className={styles.arButton} onClick={onARClick}>
          AR
        </button>
      </div>

      {/* Search Bar */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search Items..."
          className={styles.searchInput}
        />
        <span className={styles.searchIcon}>🔍</span>
      </div>
    </>
  );
}
