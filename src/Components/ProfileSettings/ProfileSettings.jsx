import React, { useState } from "react";
import "./ProfileSettings.css";

export const ProfileSettings = () => {
  const [userUpdate, setUserUpdate] = useState({});

  const handleChange = (e) => {
    setUserUpdate({ ...userUpdate, [e.target.name]: e.target.value });
  };

  return (
    <div id="settings-form-container">
      <form id="settings-form" onChange={handleChange}>
        <input type="text" placeholder="First Name" name="firstName" />
        <input type="text" placeholder="Last Name" name="lastName" />
        <input type="text" placeholder="Email" name="email" />
        <input type="text" placeholder="Phone" name="phone" />
        <input type="text" placeholder="Password" name="password" />
        <input type="text" placeholder="Bio" name="bio" />
        <button>Save</button>
      </form>
    </div>
  );
};
