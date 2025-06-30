import styles from "./menu.module.css";
import { useNavigate } from "react-router-dom";

// Image Imports
import vegMomo from "../assets/images/vegMomo.png";
import buff from "../assets/images/buff.png";
import vegPizza from "../assets/images/vegPizzza.png";
import cheesePizza from "../assets/images/cheesePizza.png";
import pepperoni from "../assets/images/pepperonii.png";
import cheese from "../assets/images/cheeseBuurrger.jpg";
import chicken from "../assets/images/chickenBurrgger.jpg";
import vegBurger from "../assets/images/vegBurgerr.png";
import salmonSushi from "../assets/images/salmonSushi.jpg";
import vegSushi from "../assets/images/vegSushi.jpg";
import sushiRoll from "../assets/images/sushiRoll.jpg";
import friedChicken from "../assets/images/friedChicken.jpg";
import grilledChicken from "../assets/images/grilledChicken.jpg";
import chickenWings from "../assets/images/chickenWings.jpg";

export default function Menu() {
  const navigate = useNavigate();

  const itemsData = {
    "Mo:mo": [
      { id: 1, name: "Veg Mo:mo", price: 250, image: vegMomo, category: "Mo:mo", description: "Tasty vegetarian momo" },
      { id: 2, name: "Buff Mo:mo", price: 300, image: buff, category: "Mo:mo", description: "Spicy buff momo delight" },
      { id: 3, name: "Mo:mo", price: 280, image: buff, category: "Mo:mo", description: "Classic steamed momo" },
    ],
    Pizza: [
      { id: 1, name: "Veg Pizza", price: 400, image: vegPizza, category: "Pizza", description: "Vegetable-loaded pizza" },
      { id: 2, name: "Cheese Pizza", price: 450, image: cheesePizza, category: "Pizza", description: "Cheesy and gooey" },
      { id: 3, name: "Pepperoni Pizza", price: 500, image: pepperoni, category: "Pizza", description: "Classic pepperoni" },
    ],
    Burger: [
      { id: 1, name: "Veg Burger", price: 200, image: vegBurger, category: "Burger", description: "Fresh veggie burger" },
      { id: 2, name: "Chicken Burger", price: 250, image: chicken, category: "Burger", description: "Juicy chicken patty" },
      { id: 3, name: "Cheese Burger", price: 300, image: cheese, category: "Burger", description: "Melted cheese delight" },
    ],
    Sushi: [
      { id: 1, name: "Salmon Sushi", price: 600, image: salmonSushi, category: "Sushi", description: "Fresh salmon sushi" },
      { id: 2, name: "Veg Sushi", price: 500, image: vegSushi, category: "Sushi", description: "Vegetarian roll" },
      { id: 3, name: "Sushi Roll", price: 550, image: sushiRoll, category: "Sushi", description: "Classic roll combo" },
    ],
    Chicken: [
      { id: 1, name: "Fried Chicken", price: 400, image: friedChicken, category: "Chicken", description: "Crispy and golden" },
      { id: 2, name: "Grilled Chicken", price: 450, image: grilledChicken, category: "Chicken", description: "Grilled to perfection" },
      { id: 3, name: "Chicken Wings", price: 350, image: chickenWings, category: "Chicken", description: "Spicy wings delight" },
    ],
  };

  const handleItemClick = (item) => {
    navigate("/addOrder", { state: { item } });
  };

  return (
    <div className={styles.menuContent}>
      {Object.entries(itemsData).map(([sectionTitle, items]) => (
        <div className={styles.menuSection} key={sectionTitle}>
          <h2 className={styles.sectionTitle}>{sectionTitle}</h2>
          <div className={styles.itemsContainer}>
            {items.map((item) => (
              <div
                key={item.id}
                className={styles.menuItem}
                onClick={() => handleItemClick(item)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className={styles.itemImage}
                />
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
      ))}
    </div>
  );
}
