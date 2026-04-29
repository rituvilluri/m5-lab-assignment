import React from "react";
import { useNavigate } from "react-router-dom";
import FacebookLoginButton from "./FacebookLoginButton";
import { startFacebookLogin } from "./facebook";

function Signin() {
  const navigate = useNavigate();

  function handleFacebookLogin() {
    startFacebookLogin(() => navigate("/checkout"));
  }

  return (
    <div className="signin-page auth-panel">
      <h1>Sign In</h1>

      <div className="panel-body">
        <p className="signin-copy">Please login using one of the following:</p>

        <form className="signin-form">
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" placeholder="Your name" />

          <label htmlFor="email">Email:</label>
          <input id="email" type="email" placeholder="Your email" />

          <button type="button" className="action-btn login-btn">
            Login
          </button>
        </form>

        <FacebookLoginButton onLogin={handleFacebookLogin} />
      </div>
    </div>
  );
}

export default Signin;
