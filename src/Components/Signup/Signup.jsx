import React from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

export const Signup = () => {
  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      const [, passwordInput, confirmPasswordInput] = e.target;

      if (passwordInput.value !== confirmPasswordInput.value)
        throw Error("Passwords dont match");

      console.log("Signed Up");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-signup-form-container">
      <div className="form-header">Sign Up</div>
      <form onSubmit={handleSubmit} className="login-signup-form">
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
        <input type="tel" placeholder="Phone" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <button>Sign Up</button>
      </form>
      <div className="form-footer">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};
