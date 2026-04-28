import React, { useState } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

// This component displays products in horizontal rows instead of a table
function DisplayProducts({ products, handleAdd, handleSubtract }) {
  // Track whether the modal is open
  const [showModal, setShowModal] = useState(false);

  // Store the currently selected product for the modal
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Open the modal with the clicked product
  function openModal(product) {
    setSelectedProduct(product);
    setShowModal(true);
  }

  // Close the modal
  function closeModal() {
    setShowModal(false);
    setSelectedProduct(null);
  }

  return (
    <div className="store-list">
      {products.map((product) => (
        <div key={product.id} className="store-row">
          {/* Left side: title and image */}
          <div className="store-left">
            <h2>{product.desc}</h2>

            <img
              src={product.image}
              alt={product.desc}
              className="product-img"
              onClick={() => openModal(product)}
            />
          </div>

          {/* Right side: quantity controls */}
          <div className="store-right">
            <div className="qty-area">
              <button
                onClick={() => handleAdd(product.id)}
                aria-label="Add one"
              >
                <FaPlusCircle />
              </button>

              <input type="text" value={product.qty} readOnly />

              <button
                onClick={() => handleSubtract(product.id)}
                aria-label="Remove one"
              >
                <FaMinusCircle />
              </button>

              <span>quantity</span>
            </div>
          </div>
        </div>
      ))}

      {/* Modal / lightbox */}
      {showModal && selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              X
            </button>

            <h2>{selectedProduct.desc}</h2>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.desc}
              className="modal-img"
            />

            <p>
              <strong>Ratings:</strong> {selectedProduct.ratings}/5
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DisplayProducts;
