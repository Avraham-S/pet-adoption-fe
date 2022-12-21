import React from "react";
import "./ProfileSettings.css";

export const ProfileSettings = () => {
  return (
    <div id="settings-form-container">
      <form id="settings-form">
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Phone" />
        <input type="text" placeholder="Password" />
        <input type="text" placeholder="Bio" />
        <button>Save</button>
      </form>
    </div>
  );
};
