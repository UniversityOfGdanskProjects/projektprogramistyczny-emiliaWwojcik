import React from "react";
import "./Navbar.css";
import Logo from "../../assets/Logo.png";

export default function Navbar() {
  return (
    <div className="Navbar">
      <div className="Main">
        <ul>
          <li className="company">
            <img src={Logo} alt="logo" width="60px" />
            <h1>
              <a href="./">Berry</a>
            </h1>
          </li>
          <li>
            <div className="right">
              <a href="./SignIn">Sign In / Register</a>
              <a href="#">KOSZYK</a>
            </div>
          </li>
        </ul>
      </div>
      <div className="Nav">
        <ul>
          <li>
            <a href="#">Just In</a>
          </li>
          <li>
            <a href="#">Designer</a>
          </li>
          <li>
            <a href="#">Dresses</a>
          </li>
          <li>
            <a href="#">Bags</a>
          </li>
          <li>
            <a href="#">Sale</a>
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
