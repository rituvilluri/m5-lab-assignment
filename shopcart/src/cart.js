import React from "react";

// Cart page showing only products with quantity > 0
function Cart({ products }) {
  // Only keep products that have been added to the cart
  const cartItems = products.filter((product) => product.qty > 0);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {/* If no items are in the cart */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((product) => (
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
                <strong>{product.qty}</strong> in cart
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;
