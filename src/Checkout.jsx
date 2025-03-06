import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "./Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const [shippingData, setShippingData] = useState({
    street: "",
    city: "",
    zipCode: "",
    country: "",
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [contactData, setContactData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
    repeatPassword: "",
  });
  const [isChecked, setIsChecked] = useState(false);

  const validateAllData = () => {
    const baseValidation =
      shippingData.street.trim() !== "" &&
      shippingData.city.trim() !== "" &&
      shippingData.zipCode.trim() !== "" &&
      shippingData.country.trim() !== "" &&
      paymentData.cardNumber.trim() !== "" &&
      paymentData.expiryDate.trim() !== "" &&
      paymentData.cvv.trim() !== "" &&
      contactData.name.trim() !== "" &&
      contactData.surname.trim() !== "" &&
      contactData.email.trim() !== "" &&
      contactData.phone.trim() !== "";

    if (isChecked) {
      return (
        baseValidation &&
        contactData.password.trim() !== "" &&
        contactData.repeatPassword.trim() !== "" &&
        contactData.password === contactData.repeatPassword
      );
    }

    return baseValidation;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAllData()) {
      alert("Please fill in all fields");
      return;
    }
    if (isChecked && contactData.password !== contactData.repeatPassword) {
      alert("Passwords do not match!");
      return;
    }

    // W prawdziwej aplikacji tutaj byłoby wysyłanie zamówienia do backendu
    navigate("/order-confirmation", {
      state: {
        name: contactData.name,
        email: contactData.email,
      },
    });
  };

  return (
    <div>
      <Navbar />
      <div className="checkout-container">
        <h1>Checkout</h1>
        <form className="checkout-form-container" onSubmit={handleSubmit}>
          <div className="checkout-section">
            <h2>Shipping Address</h2>
            <div className="section-content">
              <input
                type="text"
                placeholder="Street Address"
                value={shippingData.street}
                onChange={(e) =>
                  setShippingData({ ...shippingData, street: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="City"
                value={shippingData.city}
                onChange={(e) =>
                  setShippingData({ ...shippingData, city: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="ZIP Code"
                value={shippingData.zipCode}
                onChange={(e) =>
                  setShippingData({ ...shippingData, zipCode: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Country"
                value={shippingData.country}
                onChange={(e) =>
                  setShippingData({ ...shippingData, country: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="checkout-section">
            <h2>Payment Method</h2>
            <div className="section-content">
              <input
                type="text"
                placeholder="Card Number"
                value={paymentData.cardNumber}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, cardNumber: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="MM/YY"
                value={paymentData.expiryDate}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, expiryDate: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="CVV"
                value={paymentData.cvv}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, cvv: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="checkout-section">
            <h2>Contact Information</h2>
            <div className="section-content">
              <input
                type="text"
                placeholder="Name"
                value={contactData.name}
                onChange={(e) =>
                  setContactData({ ...contactData, name: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Surname"
                value={contactData.surname}
                onChange={(e) =>
                  setContactData({ ...contactData, surname: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={contactData.email}
                onChange={(e) =>
                  setContactData({ ...contactData, email: e.target.value })
                }
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={contactData.phone}
                onChange={(e) =>
                  setContactData({ ...contactData, phone: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="hello-checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label htmlFor="hello-checkbox">
              I want to create an account and get 10% off next order !
            </label>
          </div>

          {isChecked && (
            <div className="password-section">
              <input
                type="password"
                placeholder="Password"
                value={contactData.password}
                onChange={(e) =>
                  setContactData({ ...contactData, password: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Repeat Password"
                value={contactData.repeatPassword}
                onChange={(e) =>
                  setContactData({
                    ...contactData,
                    repeatPassword: e.target.value,
                  })
                }
                required
              />
            </div>
          )}

          <button type="submit" className="place-order-button">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}
