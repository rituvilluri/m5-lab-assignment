import React from "react";
import { FaChild } from "react-icons/fa";

function Checkout() {
  return (
    <div className="checkout-page auth-panel">
      <h1>Check Out</h1>

      <div className="panel-body">
        <p className="welcome-message">
          <FaChild />
          Welcome Back Rich West!
        </p>

        <p>Time to check out?</p>
      </div>
    </div>
  );
}

export default Checkout;
