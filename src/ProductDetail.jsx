import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import cart from "./assets/basket.png";
import "./ProductDetail.css";
import StarRating from "./StarRating";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);

        const similarResponse = await axios.get(
          `https://fakestoreapi.com/products/category/${response.data.category}`
        );

        const filteredSimilarProducts = similarResponse.data
          .filter((p) => p.id !== parseInt(id))
          .slice(0, 6);

        setSimilarProducts(filteredSimilarProducts);
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
          <StarRating productId={id} />
        </div>
      </div>

      {similarProducts.length > 0 && (
        <div className="similar-products">
          <h2>Similar Products</h2>
          <Carousel interval={3000}>
            {similarProducts.map((similar) => (
              <Carousel.Item key={similar.id}>
                <div className="d-flex justify-content-center">
                  <div className="similar-product-card">
                    <img
                      src={similar.image}
                      alt={similar.title}
                      className="similar-product-image"
                    />
                    <p>{similar.title}</p>
                    <p className="similar-price">${similar.price}</p>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
}
