import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import cart from "./assets/basket.png";
import "./Jewelery.css";

export default function Jewelery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productRatings, setProductRatings] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products/category/jewelery"
        );
        const jeweleryData = response.data;
        setItems(jeweleryData);

        const ratingsPromises = jeweleryData.map(async (product) => {
          const savedRatings = localStorage.getItem(`ratings_${product.id}`);
          const ratings = savedRatings ? JSON.parse(savedRatings) : [];

          const averageRating =
            ratings.length > 0
              ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
              : 0;

          return {
            productId: product.id,
            averageRating: parseFloat(averageRating),
            ratingCount: ratings.length,
          };
        });

        const ratings = await Promise.all(ratingsPromises);
        const ratingsMap = ratings.reduce((acc, rating) => {
          acc[rating.productId] = rating;
          return acc;
        }, {});

        setProductRatings(ratingsMap);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
        {items.map((item) => {
          const rating = productRatings[item.id] || {
            averageRating: 0,
            ratingCount: 0,
          };
          return (
            <div
              key={item.id}
              className="item jewelery-item"
              onClick={() => (window.location.href = `/product/${item.id}`)}
            >
              <img id="pictures-jewelery" src={item.image} alt={item.title} />
              <h2 id="describtions-jewelery">{item.title}</h2>
              <p id="prices-jewelery">${item.price}</p>
              <button className="addToBasket">
                <img id="cart" src={cart} alt="Add to basket" />
              </button>
              <p className="small-rating">
                {rating.averageRating.toFixed(1)} ★ ({rating.ratingCount}{" "}
                reviews)
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
