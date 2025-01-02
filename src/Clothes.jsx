import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import axios from "axios";
import "./Clothes.css";
import cart from "./assets/basket.png";

export default function Clothes() {
  const [clothing, setClothing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClothing = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products/category/women's clothing"
        );
        setClothing(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching clothing:", error);
        setLoading(false);
      }
    };

    fetchClothing();
  }, []);

  if (loading) {
    return (
      <div className="clothes">
        <Navbar />
        <h1 id="loading-womens-clothes">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="clothes">
      <Navbar />
      <h1 id="women-clothes">Women's clothes</h1>
      <div className="box">
        {clothing.map((item) => (
          <div key={item.id} className="item">
            <img id="pictures-clothes" src={item.image} alt={item.title} />
            <h2 id="describtions-clothes">{item.title}</h2>
            <p id="prices-clothes">${item.price}</p>
            <button className="addToBasket">
              <img id="cart" src={cart} alt="Add to basket" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
