import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useUser } from "../../Contexts/UserProvider";
import "./ProfilePage.css";
import backgroundImage from "../../resources/tile_background.png";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({});
  const [user] = useUser();
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}users/${user.id}`
      );
      setUserInfo(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div
      id="profile-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          padding: "0.5rem",
        }}
      >
        <button
          onClick={() => {
            navigate("/profileSettings");
          }}
          className="button-style"
        >
          Edit Profile
        </button>
        <button
          onClick={() => {
            navigate("/myPets");
          }}
          className="button-style"
        >
          My pets
        </button>
      </div>
      <div id="info-container">
        <div style={{ display: "flex", gap: "1rem" }}>
          <div className="info-entry">
            Name: {userInfo.firstName} {userInfo.lastName}
          </div>
          <div className="info-entry">Email: {userInfo.email}</div>
          <div className="info-entry">Phone Number: {userInfo.phone}</div>
        </div>
        <div className="info-entry">
          <div>Bio: {userInfo.bio}</div>
        </div>
      </div>
    </div>
  );
};
