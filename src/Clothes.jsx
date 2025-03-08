import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Filter from "./components/Filter/Filter";
import cart from "./assets/basket.png";
import "./Clothes.css";

export default function Clothes() {
  const [clothing, setClothing] = useState([]);
  const [filteredClothing, setFilteredClothing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productRatings, setProductRatings] = useState({});
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    rating: "",
    sort: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClothing = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products/category/women's%20clothing"
        );
        const clothingData = response.data;
        setClothing(clothingData);
        setFilteredClothing(clothingData);

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

  useEffect(() => {
    let filtered = [...clothing];

    if (filters.minPrice) {
      filtered = filtered.filter(
        (item) => item.price >= Number(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(
        (item) => item.price <= Number(filters.maxPrice)
      );
    }

    if (filters.rating) {
      filtered = filtered.filter((item) => {
        const rating = productRatings[item.id]?.averageRating || 0;
        if (filters.rating === "5") {
          return rating === 5;
        }
        return rating > 0 && rating >= Number(filters.rating);
      });
    }

    if (filters.sort) {
      switch (filters.sort) {
        case "price-asc":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "price-desc":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "rating-desc":
          filtered.sort((a, b) => {
            const ratingA = productRatings[a.id]?.averageRating || 0;
            const ratingB = productRatings[b.id]?.averageRating || 0;
            return ratingB - ratingA;
          });
          break;
        default:
          break;
      }
    }

    setFilteredClothing(filtered);
  }, [filters, clothing, productRatings]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
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
      <Filter filters={filters} setFilters={setFilters} />
      <h1 id="women-clothes">Women's Clothes</h1>
      <div className="box clothing-container">
        {filteredClothing.map((item) => {
          const rating = productRatings[item.id] || {
            averageRating: 0,
            ratingCount: 0,
          };
          return (
            <div key={item.id} className="item clothing-item">
              <img
                id="pictures-clothes"
                src={item.image}
                alt={item.title}
                onClick={() => handleProductClick(item.id)}
              />
              <h2 id="describtions-clothes">{item.title}</h2>
              <p id="prices-clothes">${item.price}</p>
              <button
                className="addToBasket"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(item);
                }}
              >
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
