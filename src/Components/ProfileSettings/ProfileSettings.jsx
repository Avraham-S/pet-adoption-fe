import React, { useState } from "react";
import { useLoggedIn } from "../../Contexts/LoggedInProvider";
import { useNavigate } from "react-router-dom";
import "./ProfileSettings.css";
import { useRef } from "react";
import { useEffect } from "react";

export const ProfileSettings = () => {
  const [userUpdate, setUserUpdate] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useLoggedIn();
  const bioInput = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/home");
  });
  const handleChange = (e) => {
    setUserUpdate({ ...userUpdate, [e.target.name]: e.target.value });
  };

  function handleHeight() {
    const ta = bioInput.current;
    ta.style.height = `auto`;
    ta.style.height = `${ta.scrollHeight}px`;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div id="settings-form-container">
      <div style={{ fontSize: "2rem" }}>Edit Profile</div>
      <form
        id="settings-form"
        onChange={(e) => {
          handleChange(e);
          handleHeight();
        }}
        onSubmit={handleSubmit}
      >
        <div className="input-container">
          <label htmlFor="firstName">First Name</label>
          <input type="text" name="firstName" />
        </div>
        <div className="input-container">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="lastName" />
        </div>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" />
        </div>
        <div className="input-container">
          <label htmlFor="phone">Phone</label>
          <input type="text" name="phone" />
        </div>
        <div className="input-container">
          <label htmlFor="password">Current Password</label>
          <input type="password" name="currentPassword" />
        </div>
        <div className="input-container">
          <label htmlFor="password">New Password</label>
          <input type="password" name="password" />
        </div>
        <div className="input-container">
          <label>Confirm New Password</label>
          <input type="password" />
        </div>
        <div className="input-container">
          <label htmlFor="bio">Bio</label>
          <textarea type="text" name="bio" ref={bioInput} />
        </div>
        <button>Save</button>
      </form>
    </div>
  );
};
