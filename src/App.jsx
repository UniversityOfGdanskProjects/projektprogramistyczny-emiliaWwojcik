import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Clothes from "./Clothes.jsx";
import Jewelery from "./Jewelery.jsx";
import SignIn from "./SignIn";
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/jewelery" element={<Jewelery />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          {/* Add more admin routes as needed */}
        </Route>
      </Routes>
    </Router>
  );
}

fetch("https://fakestoreapi.com/products/category/jewelery")
  .then((res) => res.json())
  .then((json) => console.log(json));
