import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./Jewelery.css";
import cart from "./assets/basket.png";

export default function Jewelery() {
  const [jewelery, setJewelery] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJewelery = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products/category/jewelery"
        );
        setJewelery(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchJewelery();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return (
      <div className="jewelery">
        <Navbar />
        <h1 id="loading-jewelery">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="jewelery">
      <Navbar />
      <h1 id="jewelery">Jewelery</h1>
      <div className="box jewelery-container">
        {jewelery.map((item) => (
          <div
            key={item.id}
            className="item jewelery-item"
            onClick={() => handleProductClick(item.id)}
          >
            <img id="pictures-jewelery" src={item.image} alt={item.title} />
            <h2 id="describtions-jewelery">{item.title}</h2>
            <p id="prices-jewelery">${item.price}</p>
            <button className="addToBasket">
              <img id="cart" src={cart} alt="Add to basket" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
