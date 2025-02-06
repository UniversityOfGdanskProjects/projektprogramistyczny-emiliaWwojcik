import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Clothes from "./Clothes.jsx";
import Jewelery from "./Jewelery.jsx";
import SignIn from "./SignIn";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./components/admin/Dashboard";
import ProductDetail from "./ProductDetail.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/jewelery" element={<Jewelery />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

fetch("https://fakestoreapi.com/products/category/jewelery")
  .then((res) => res.json())
  .then((json) => console.log(json));
