// App.js
// Main app component.
// Loads product data, stores state, manages quantity handlers, and sets up routes.

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { loadProducts } from "./products";
import NavigationBar from "./navbar";
import Home from "./home";
import Cart from "./cart";

function App() {
  // Store all products in state
  const [products, setProducts] = useState([]);

  // Load data from public/data.txt when app starts
  useEffect(() => {
    loadProducts()
      .then((items) => setProducts(items))
      .catch((error) => console.error("Failed to load products:", error));
  }, []);

  // Increase quantity by 1 for the selected product
  function handleAdd(id) {
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        return { ...product, qty: product.qty + 1 };
      }
      return product;
    });

    setProducts(updatedProducts);
  }

  // Decrease quantity by 1 for the selected product
  // Do not allow quantity to go below 0
  function handleSubtract(id) {
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        return { ...product, qty: Math.max(product.qty - 1, 0) };
      }
      return product;
    });

    setProducts(updatedProducts);
  }

  // Total quantity of all products shown beside cart icon
  const totalItems = products.reduce((sum, product) => sum + product.qty, 0);

  return (
    <Router>
      <div className="page">
        {/* Navbar appears on every page */}
        <NavigationBar totalItems={totalItems} />

        <div className="container">
          <Routes>
            {/* Home route */}
            <Route
              path="/"
              element={
                <Home
                  products={products}
                  handleAdd={handleAdd}
                  handleSubtract={handleSubtract}
                />
              }
            />

            {/* Cart route */}
            <Route path="/cart" element={<Cart products={products} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
