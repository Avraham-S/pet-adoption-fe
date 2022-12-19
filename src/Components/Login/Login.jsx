import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  return (
    <div className="login-signup-form-container">
      <div className="form-header">Login</div>
      <form className="login-signup-form">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Login</button>
      </form>
      <div className="form-footer">
        New user? <Link to="/signup">Create account</Link>
      </div>
    </div>
  );
};
