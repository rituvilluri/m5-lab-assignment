import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Store all products
  const [products, setProducts] = useState([]);

  // Load the data file when the page starts
  useEffect(() => {
    fetch("/data.txt")
      .then((response) => response.text())
      .then((text) => {
        const items = parseProducts(text);
        setProducts(items);
      });
  }, []);

  // Convert the text file into product objects
  function parseProducts(text) {
    const lines = text.split("\n");
    const items = [];

    let currentProduct = null;

    lines.forEach((line) => {
      line = line.trim();

      if (line.startsWith("#")) {
        if (currentProduct) {
          items.push(currentProduct);
        }

        currentProduct = {
          id: items.length + 1,
          image: "",
          desc: "",
          value: 0,
          qty: 0,
        };
      }

      if (line.startsWith("image:")) {
        let img = line.split(":")[1].trim().replace(/'/g, "");
        img = img.replace("./", "/");
        currentProduct.image = img;
      }

      if (line.startsWith("desc:")) {
        currentProduct.desc = line.split(":")[1].trim().replace(/'/g, "");
      }

      if (line.startsWith("value:")) {
        currentProduct.value = Number(line.split(":")[1].trim());
      }
    });

    if (currentProduct) {
      items.push(currentProduct);
    }

    return items;
  }

  // Handle typing in the quantity box
  function changeQty(id, value) {
    const number = Math.max(0, Math.floor(Number(value)));

    const updatedProducts = products.map((p) => {
      if (p.id === id) {
        return { ...p, qty: number };
      }
      return p;
    });

    setProducts(updatedProducts);
  }

  // Calculate total items in cart
  const totalItems = products.reduce((sum, p) => sum + p.qty, 0);

  return (
    <div className="page">
      <div className="topbar">
        <div className="title">Shop to React</div>
        <div className="cart">🛒 {totalItems} items</div>
      </div>

      {products.map((product) => (
        <div key={product.id} className="product-row">
          <h2>{product.desc}</h2>

          <div className="product-body">
            <img
              src={product.image}
              alt={product.desc}
              className="product-img"
            />

            <div className="qty-area">
              <input
                type="number"
                min="0"
                value={product.qty}
                onChange={(e) => changeQty(product.id, e.target.value)}
              />

              <span>quantity</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
