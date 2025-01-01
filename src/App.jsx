import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Display from "./components/Display/Display";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <div>
      <Navbar />
      <Display />
      {/* <Footer /> */}
    </div>
  );
}
