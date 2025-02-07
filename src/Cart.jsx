import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import "./Cart.css";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cart-update"));
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cart-update"));
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div>
      <Navbar />
      <h1 className="cart-title">Shopping bag</h1>
      <div className="cart-container">
        <div className="cart-items-container">
          {cartItems.length === 0 ? (
            <p className="noting-incart">
              Your shopping bag is empty... <span>Time to go shopping!</span>
            </p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-items">
                <img src={item.image} alt={item.title} />
                <div className="products-incart">
                  <h2>{item.title}</h2>
                  <p className="price">Price: {item.price}$</p>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                  />
                  <button onClick={() => removeFromCart(item.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="cart-summary">
            <hr />
            <h2>
              Summary: <span>${calculateTotal()}</span>
            </h2>
            <button>Go to checkout</button>
            <hr />
          </div>
        )}
      </div>
    </div>
  );
}
