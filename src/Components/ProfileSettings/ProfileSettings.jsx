import React, { useState } from "react";
import { useLoggedIn } from "../../Contexts/LoggedInProvider";
import { useNavigate } from "react-router-dom";
import "./ProfileSettings.css";
import { useRef } from "react";
import { useUser } from "../../Contexts/UserProvider";
import axios from "axios";
import { useEffect } from "react";

export const ProfileSettings = () => {
  const [userUpdate, setUserUpdate] = useState({});
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useLoggedIn();
  const [userInfo, setUserInfo] = useState({});
  const [currentUser] = useUser();
  const bioInput = useRef();
  const navigate = useNavigate();
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();

  useEffect(() => {
    if (!isLoggedIn) navigate("/home");
    console.log("set userUpdate", userUpdate);
  });

  useEffect(() => {
    getUserInfo();
    console.log("use effect", userUpdate);
  }, []);

  const getUserInfo = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/users/${currentUser.id}`
      );
      console.log("got data", data);
      setUserInfo(data);
      setUserUpdate(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (id) => {
    try {
      console.log("frontend", userUpdate);
      console.log(id);
      const token = JSON.parse(localStorage.getItem("token"));

      const headersConfig = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(
        `http://localhost:8080/users/updateUser/${
          showUpdatePassword ? "password/" : ""
        }${id}`,
        userUpdate,
        headersConfig
      );
      console.log("passed");
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleChange = (e) => {
    if (e.target.type === "checkbox") return;
    setUserUpdate({ ...userUpdate, [e.target.name]: e.target.value });
  };

  function handleHeight() {
    const ta = bioInput.current;
    ta.style.height = `auto`;
    ta.style.height = `${ta.scrollHeight}px`;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordInput.current.value !== confirmPasswordInput.current.value)
      throw Error("Passwords dont match");
    updateUser(currentUser.id);
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
          <input
            type="text"
            name="firstName"
            defaultValue={userInfo.firstName}
          />
        </div>
        <div className="input-container">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="lastName" defaultValue={userInfo.lastName} />
        </div>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" defaultValue={userInfo.email} />
        </div>
        <div className="input-container">
          <label htmlFor="phone">Phone</label>
          <input type="text" name="phone" defaultValue={userInfo.phone} />
        </div>
        {showUpdatePassword && (
          <>
            <div className="input-container">
              <label htmlFor="password">Current Password</label>
              <input type="password" name="currentPassword" />
            </div>
            <div className="input-container">
              <label htmlFor="password">New Password</label>
              <input type="password" name="password" ref={passwordInput} />
            </div>
            <div className="input-container">
              <label>Confirm New Password</label>
              <input
                type="password"
                name="repassword"
                ref={confirmPasswordInput}
              />
            </div>
          </>
        )}
        <div className="input-container">
          <label htmlFor="bio">Bio</label>
          <textarea
            type="text"
            name="bio"
            ref={bioInput}
            defaultValue={userInfo.bio}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>
            <input
              type="checkbox"
              onChange={(e) => {
                setShowUpdatePassword(e.target.checked);
              }}
            />{" "}
            Change Password
          </span>
          <button>Save</button>
        </div>
      </form>
    </div>
  );
};
