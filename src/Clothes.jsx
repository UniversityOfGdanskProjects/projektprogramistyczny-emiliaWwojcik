import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import cart from "./assets/basket.png";
import "./Clothes.css";

export default function Clothes() {
  const [clothing, setClothing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productRatings, setProductRatings] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClothing = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products/category/women's clothing"
        );
        const clothingData = response.data;
        setClothing(clothingData);

        const ratingsPromises = clothingData.map(async (product) => {
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
        console.error("Error fetching clothing products:", error);
        setLoading(false);
      }
    };

    fetchClothing();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

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
      <h1 id="women-clothes">Women's Clothes</h1>
      <div className="box clothing-container">
        {clothing.map((item) => {
          const rating = productRatings[item.id] || {
            averageRating: 0,
            ratingCount: 0,
          };
          return (
            <div
              key={item.id}
              className="item clothing-item"
              onClick={() => handleProductClick(item.id)}
            >
              <img id="pictures-clothes" src={item.image} alt={item.title} />
              <h2 id="describtions-clothes">{item.title}</h2>
              <p id="prices-clothes">${item.price}</p>
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
