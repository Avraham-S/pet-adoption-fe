import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useUser } from "../../Contexts/UserProvider";
import "./ProfilePage.css";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({});
  const [user] = useUser();
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/users/${user.id}`
      );
      console.log("got data", data);
      setUserInfo(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          navigate("/profileSettings");
        }}
      >
        Edit
      </button>
      <button
        onClick={() => {
          navigate("/myPets");
        }}
      >
        My pets
      </button>
      <div>
        Name: {userInfo.firstName} {userInfo.lastName}
      </div>
      <div>Email: {userInfo.email}</div>
      <div>Phone Number: {userInfo.phone}</div>
      <div>Bio: {userInfo.bio}</div>
    </div>
  );
};
