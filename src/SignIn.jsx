import React from "react";
import Navbar from "./components/Navbar/Navbar";
import "./SignIn.css";

export default function SignIn() {
  return (
    <div>
      <Navbar />
      <div className="sign">
        <h1>
          Already have an account ? <span className="pink">Sign in !</span>
        </h1>
        <form>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="E-mail"
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          ></input>
          <button type="submit">Sign in</button>
        </form>
        <h1>
          Don't yet have an account ?{" "}
          <span className="pink">
            Register and get <span style={{ fontWeight: "bold" }}>10%</span> off
            your first order !
          </span>
        </h1>
        <form>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="E-mail"
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          ></input>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Repeat password"
            required
          ></input>
          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
}
