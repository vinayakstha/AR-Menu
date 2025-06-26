import styles from "./home.module.css"
import vegMomo from "../assets/images/vegMomo.png"
import buff from "../assets/images/buff.png"
import vegPizza from "../assets/images/vegPizzza.png"
import cheesePizza from "../assets/images/cheesePizza.png"
import pepperoni from "../assets/images/pepperonii.png"
import cheese from "../assets/images/cheeseBuurrger.jpg"
import chicken from "../assets/images/chickenBurrgger.jpg"
import vegBurger from "../assets/images/vegBurgerr.png"
export default function Home() {
  const momoItems = [
    {
      id: 1,
      name: "Veg Mo:mo",
      price: 250,
      image: vegMomo,
    
    },
    {
      id: 2,
      name: "Buff Mo:mo",
      price: 300,
      image: buff,
    },
    {
      id: 3,
      name: "Mo:mo",
      price: 280,
      image: buff,
    },
  ]

  const pizzaItems = [
    {
      id: 1,
      name: "Veg Pizza",
      price: 400,
      image: vegPizza,
    },
    {
      id: 2,
      name: "Cheese Pizza",
      price: 450,
      image: cheesePizza,
    },
    {
      id: 3,
      name: "Pepperoni Pizza",
      price: 500,
      image: pepperoni,
    },
  ]

  const burgerItems = [
    {
      id: 1,
      name: "Veg Burger",
      price: 200,
      image: vegBurger,
    },
    {
      id: 2,
      name: "Chicken Burger",
      price: 250,
      image: chicken,
    },
    {
      id: 3,
      name: "Cheese Burger",
      price: 300,
      image: cheese,
    },
  ]

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1>Table 14 Menu</h1>
      </div>

      {/* Search Bar */}
      <div className={styles.searchContainer}>
        <input type="text" placeholder="Search Items..." className={styles.searchInput} />
        <span className={styles.searchIcon}>🔍</span>
      </div>

      {/* Menu Content */}
      <div className={styles.menuContent}>
        {/* Mo:mo Section */}
        <div className={styles.menuSection}>
          <h2 className={styles.sectionTitle}>Mo:mo</h2>
          <div className={styles.itemsContainer}>
            {momoItems.map((item) => (
              <div key={item.id} className={styles.menuItem}>
                <img src={item.image || "/placeholder.svg"} alt={item.name} className={styles.itemImage} />
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <div className={styles.itemBottom}>
                    <span className={styles.itemPrice}>Rs. {item.price}</span>
                    <span className={styles.eyeIcon}>👁</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pizza Section */}
        <div className={styles.menuSection}>
          <h2 className={styles.sectionTitle}>Pizza</h2>
          <div className={styles.itemsContainer}>
            {pizzaItems.map((item) => (
              <div key={item.id} className={styles.menuItem}>
                <img src={item.image || "/placeholder.svg"} alt={item.name} className={styles.itemImage} />
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <div className={styles.itemBottom}>
                    <span className={styles.itemPrice}>Rs. {item.price}</span>
                    <span className={styles.eyeIcon}>👁</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Burger Section */}
        <div className={styles.menuSection}>
          <h2 className={styles.sectionTitle}>Burger</h2>
          <div className={styles.itemsContainer}>
            {burgerItems.map((item) => (
              <div key={item.id} className={styles.menuItem}>
                <img src={item.image || "/placeholder.svg"} alt={item.name} className={styles.itemImage} />
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <div className={styles.itemBottom}>
                    <span className={styles.itemPrice}>Rs. {item.price}</span>
                    <span className={styles.eyeIcon}>👁</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}