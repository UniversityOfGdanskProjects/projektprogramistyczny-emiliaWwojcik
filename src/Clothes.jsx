import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Filter, { FilterProvider, useFilter } from "./components/Filter/Filter";
import cart from "./assets/basket.png";
import { addToCart } from "./components/cartAdd/cartAdd";
import "./Clothes.css";

const ClothesContent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productRatings, setProductRatings] = useState({});
  const { state: filterState } = useFilter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products/category/women's clothing"
        );
        setProducts(response.data);
        setLoading(false);

        const ratingsPromises = response.data.map(async (product) => {
          const savedRatings = localStorage.getItem(`ratings_${product.id}`);
          const ratings = savedRatings ? JSON.parse(savedRatings) : [];

          if (ratings.length > 0) {
            const sum = ratings.reduce((acc, curr) => acc + curr, 0);
            return {
              productId: product.id,
              averageRating: sum / ratings.length,
              ratingCount: ratings.length,
            };
          }
          return {
            productId: product.id,
            averageRating: 0,
            ratingCount: 0,
          };
        });

        const ratingsResults = await Promise.all(ratingsPromises);
        const ratingsMap = ratingsResults.reduce((acc, curr) => {
          acc[curr.productId] = {
            averageRating: curr.averageRating,
            ratingCount: curr.ratingCount,
          };
          return acc;
        }, {});

        setProductRatings(ratingsMap);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const { minPrice, maxPrice, rating } = filterState;

        const meetsMinPrice = !minPrice || product.price >= Number(minPrice);
        const meetsMaxPrice = !maxPrice || product.price <= Number(maxPrice);
        const meetsRating =
          !rating ||
          (rating === "5"
            ? productRatings[product.id]?.averageRating === 5
            : productRatings[product.id]?.averageRating >= Number(rating));

        return meetsMinPrice && meetsMaxPrice && meetsRating;
      })
      .sort((a, b) => {
        switch (filterState.sort) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "rating-desc":
            return (
              (productRatings[b.id]?.averageRating || 0) -
              (productRatings[a.id]?.averageRating || 0)
            );
          default:
            return 0;
        }
      });
  }, [products, filterState, productRatings]);

  const handleProductClick = (productId) => {
    window.location.href = `/product/${productId}`;
  };

  if (loading) {
    return (
      <div className="clothes">
        <h1 id="loading-womens-clothes">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="clothes">
      <div className="box clothing-container">
        {filteredProducts.map((product) => (
          <div key={product.id} className="item clothing-item">
            <img
              id="pictures-clothes"
              src={product.image}
              alt={product.title}
              onClick={() => handleProductClick(product.id)}
            />
            <h2 id="describtions-clothes">{product.title}</h2>
            <p id="prices-clothes">${product.price}</p>
            <button
              className="addToBasket"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
            >
              <img id="cart" src={cart} alt="Add to basket" />
            </button>
            <p className="small-rating">
              {(productRatings[product.id]?.averageRating || 0).toFixed(1)} ★ (
              {productRatings[product.id]?.ratingCount || 0} reviews)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Clothes = () => {
  return (
    <FilterProvider>
      <div className="clothes">
        <Navbar />
        <h1 id="women-clothes">Women's Clothes</h1>
        <div className="content">
          <Filter />
          <ClothesContent />
        </div>
      </div>
    </FilterProvider>
  );
};

export default Clothes;
