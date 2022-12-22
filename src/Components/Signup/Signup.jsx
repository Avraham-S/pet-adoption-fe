import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

export const Signup = () => {
  const [userInfo, setUserInfo] = useState({});
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      console.log(passwordInput, confirmPasswordInput);

      if (passwordInput.current.value !== confirmPasswordInput.current.value)
        throw Error("Passwords dont match");

      console.log("Signed Up");
    } catch (error) {
      console.error(error);
    }
  };

  console.log("Signup rendered");

  return (
    <div className="login-signup-form-container">
      <div className="form-header">Sign Up</div>
      <form
        onSubmit={handleSubmit}
        onChange={handleChange}
        className="login-signup-form"
      >
        <input type="text" placeholder="First Name" name="firstName" required />
        <input type="text" placeholder="Last Name" name="lastName" required />
        <input type="tel" placeholder="Phone" name="phone" required />
        <input type="email" placeholder="Email" name="email" required />
        <input
          type="password"
          placeholder="Password"
          name="password"
          ref={passwordInput}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          ref={confirmPasswordInput}
          required
        />
        <button>Sign Up</button>
      </form>
      <div className="form-footer">
        Already have an account? <Link to="/home/login">Login</Link>
      </div>
    </div>
  );
};
