import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [userInfo, setUserInfo] = useState({});

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-signup-form-container">
      <div className="form-header">Login</div>
      <form className="login-signup-form" onChange={handleChange}>
        <input type="email" placeholder="Email" name="email" />
        <input type="password" placeholder="Password" name="password" />
        <button>Login</button>
      </form>
      <div className="form-footer">
        New user? <Link to="/home/signup">Create account</Link>
      </div>
    </div>
  );
};
