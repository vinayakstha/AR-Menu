import styles from "./Menu.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect,useState } from "react";

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
    const [itemsData, setItemsData] = useState({});

  useEffect(() => {
  axios.get('http://localhost:3000/menu')
  .then(response => {
        const formatted = formatter(response.data);
        setItemsData(formatted);
  })
  .catch(error => {
    console.error(error); // handle error
  });
}, []);
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    navigate("/addOrder", { state: { item } });
  };


function formatter(firebaseData){
  const itemsData = {};

firebaseData.forEach(categoryObj => {
  const formattedCategory = categoryObj.id;
  const itemsArray = Object.values(categoryObj.items || {});
  
  itemsData[formattedCategory] = itemsArray.map((item) => ({
    id: item.id, 
    name: item.name,
    price: item.price,
    image: "http://localhost:3000/"+item.image,
    category: formattedCategory,
    description: item.description,
    model: "http://localhost:3000/"+item.model, 
  }));
});
return itemsData;
}
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
