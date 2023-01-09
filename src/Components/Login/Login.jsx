import React, { useState } from "react";
import { useLoggedIn } from "../../Contexts/LoggedInProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css";
import { useUser } from "../../Contexts/UserProvider";

export const Login = ({ toggleModal }) => {
  const [userInfo, setUserInfo] = useState({});
  const [user, setUser] = useUser();
  const [, setIsLoggedIn] = useLoggedIn();

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/users/login",
        userInfo
      );
      console.log(data);
      localStorage.setItem("token", JSON.stringify(data.token));
      setUser({ ...data });
      setIsLoggedIn(true);
      toggleModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      login();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-signup-form-container">
      <div className="form-header">Login</div>
      <form
        className="login-signup-form"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <div className="input-container">
          <label htmlFor="">Email</label>
          <input type="email" name="email" />
        </div>
        <div className="input-container">
          <label htmlFor="Password">Password</label>
          <input type="password" name="password" />
        </div>
        <button>Login</button>
      </form>
      <div className="form-footer">
        New user? <Link to="/home/signup">Create account</Link>
      </div>
    </div>
  );
};
