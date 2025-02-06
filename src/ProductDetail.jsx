import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import cart from "./assets/basket.png";
import "./ProductDetail.css";
import StarRating from "./StarRating";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading || !product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="product-detail">
        <div className="right">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="left">
          <h1 className="name">{product.title}</h1>
          <hr />
          <p className="price">Price: ${product.price}</p>
          <hr />
          <p className="description">{product.description}</p>
          <div className="addToBasket">
            <button>
              <img src={cart} className="cart" alt="Add to basket" />
            </button>
          </div>
          <div className="rating">
            <StarRating productId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
