import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLoggedIn } from "../../Contexts/LoggedInProvider";
import "./Signup.css";

export const Signup = ({ toggleModal }) => {
  const [userInfo, setUserInfo] = useState({});
  const [, setIsLoggedIn] = useLoggedIn();
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const signup = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/users/signup",
        userInfo
      );
      console.log(data.response);
      setIsLoggedIn(true);
      toggleModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      console.log(userInfo);
      if (passwordInput.current.value !== confirmPasswordInput.current.value)
        throw Error("Passwords dont match");
      signup();
      console.log("Signed Up");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-signup-form-container">
      <div className="form-header">Sign Up</div>
      <form
        onSubmit={handleSubmit}
        onChange={handleChange}
        className="login-signup-form"
      >
        <div className="input-container">
          <label htmlFor="">First Name</label>
          <input type="text" name="firstName" required />
        </div>
        <div className="input-container">
          <label htmlFor="">Last Name</label>
          <input type="text" name="lastName" required />
        </div>
        <div className="input-container">
          <label htmlFor="">Phone Number</label>
          <input type="tel" name="phone" />
        </div>
        <div className="input-container">
          <label htmlFor="">Email</label>
          <input type="email" name="email" required />
        </div>
        <div className="input-container">
          <label htmlFor="">Password</label>
          <input type="password" name="password" ref={passwordInput} required />
        </div>
        <div className="input-container">
          <label htmlFor="">Confirm Password</label>
          <input
            type="password"
            name="repassword"
            ref={confirmPasswordInput}
            required
          />
        </div>
        <button>Sign Up</button>
      </form>
      <div className="form-footer">
        Already have an account? <Link to="/home/login">Login</Link>
      </div>
    </div>
  );
};
