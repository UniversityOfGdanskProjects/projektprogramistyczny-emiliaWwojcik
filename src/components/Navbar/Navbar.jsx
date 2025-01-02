import React from "react";
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
              <a href="./">Berry</a>
            </h1>
          </li>
          <li>
            <div className="right">
              <a href="./SignIn">Sign In / Register</a>
              <a href="#">Shopping bag</a>
            </div>
          </li>
        </ul>
      </div>
      <div className="Nav">
        <ul>
          <li>
            <a href="./Clothes">Clothes</a>
          </li>
          <li>
            <a href="#">Shoes</a>
          </li>
          <li>
            <a href="#">Jewelery</a>
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
