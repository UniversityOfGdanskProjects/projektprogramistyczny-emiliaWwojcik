import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/Logo.png";

export default function Navbar() {
  return (
    <div className="Navbar">
      <div className="Main">
        <ul>
          <li className="company">
            <img src={Logo} alt="logo" />
            <h1>
              <Link to="/">Berry</Link>
            </h1>
          </li>
          <li>
            <div className="right">
              <Link to="/SignIn">Sign In / Register</Link>
              <Link to="#">Shopping bag</Link>
            </div>
          </li>
        </ul>
      </div>
      <div className="Nav">
        <ul>
          <li>
            <Link to="/Clothes">Clothes</Link>
          </li>
          <li>
            <Link to="/Jewelery">Jewelery</Link>
          </li>
          <li>
            <Link to="#">Bags</Link>
          </li>
          <li>
            <form>
              <input type="text" placeholder="🔎 Search..." />
            </form>
          </li>
        </ul>
      </div>
    </div>
  );
}
