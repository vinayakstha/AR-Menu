import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";
import AddOrder from "./components/addOrder";
import ConfirmOrder from "./components/confirmOrder";
import OrderPlaced from "./components/orderPlaced"; // ✅ New import
import OrderContext from "./components/orderContext"; // Importing OrderContext
import "./App.css";
import { useState } from "react";

function HomePageWrapper() {
  const navigate = useNavigate();

  const handleARClick = () => {
    window.location.href = "/arscene.html";
  };

  const handleVegMomoClick = () => {
    navigate("/addOrder");
  };

  return (
    <div className="container">
      <Header onARClick={handleARClick} />
      <Menu onVegMomoClick={handleVegMomoClick} />
    </div>
  );
}

function App() {
  const [order, setOrder] = useState([]);
  return (
    <OrderContext.Provider value={{ order, setOrder }}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePageWrapper />} />
        <Route path="/addOrder" element={<AddOrder />} />
        <Route path="/confirmOrder" element={<ConfirmOrder />} />
        <Route path="/orderPlaced" element={<OrderPlaced />} />{" "}
        {/* ✅ Added route */}
      </Routes>
    </BrowserRouter>
    </OrderContext.Provider>
  );
}

export default App;
