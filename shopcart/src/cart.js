import React from "react";
import { useNavigate } from "react-router-dom";

// Cart page showing only products with quantity > 0
function Cart({ products }) {
  const navigate = useNavigate();

  // Only keep products that have been added to the cart
  const cartItems = products.filter((product) => product.qty > 0);
  const totalCartItems = cartItems.reduce(
    (sum, product) => sum + product.qty,
    0,
  );

  return (
    <div className="cart-page">
      <h1>Your Cart Items</h1>

      {/* If no items are in the cart */}
      {totalCartItems === 0 ? (
        <>
          <p>There are {totalCartItems} items in your cart.</p>
          <button
            className="action-btn continue-btn"
            onClick={() => navigate("/")}
          >
            Continue Shop
          </button>
        </>
      ) : (
        <>
          {cartItems.map((product) => (
            <div key={product.id} className="cart-row">
              {/* Left side: product image and name */}
              <div className="cart-left">
                <img
                  src={product.image}
                  alt={product.desc}
                  className="cart-img"
                />

                <div className="cart-info">
                  <h3>{product.desc}</h3>
                  <p>Ratings: {product.ratings}/5</p>
                </div>
              </div>

              {/* Right side: quantity */}
              <div className="cart-right">
                <div className="cart-qty">
                  Quantity: <strong>{product.qty}</strong>
                </div>
              </div>
            </div>
          ))}

          <button
            className="action-btn checkout-btn"
            onClick={() => navigate("/signin")}
          >
            Check Out
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
