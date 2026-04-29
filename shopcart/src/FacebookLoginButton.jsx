import React from "react";
import { FaFacebookF } from "react-icons/fa";

function FacebookLoginButton({ onLogin }) {
  return (
    <button className="facebook-btn" onClick={onLogin}>
      <FaFacebookF />
      Login with Facebook
    </button>
  );
}

export default FacebookLoginButton;
