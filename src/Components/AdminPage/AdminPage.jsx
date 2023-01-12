import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoggedIn } from "../../Contexts/LoggedInProvider";
import { useUser } from "../../Contexts/UserProvider";
import "./AdminPage.css";

export const AdminPage = () => {
  const [userList, setUserList] = useState([]);
  const [isLoggedIn] = useLoggedIn();
  const [currentUser] = useUser();
  const navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      const headersConfig = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get(
        "http://localhost:8080/users",
        headersConfig
      );
      setUserList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleAdmin = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const headersConfig = { headers: { Authorization: `Bearer ${token}` } };
      const user = await axios.put(
        "http://localhost:8080/users/toggleAdmin",
        { id },
        headersConfig
      );
      return user;
    } catch (error) {
      return error;
    }
  };

  const handleAdmin = async (e) => {
    try {
      const button = e.target;
      const userId = button.dataset.id;
      const user = await toggleAdmin(userId);
      console.log(user);
      await getAllUsers();
      console.log(userList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) navigate("/home");
  });

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <div id="user-list-container">
        <div className="user-list-item">
          <span>First Name</span>
          <span>Last Name</span>
          <span>Admin</span>
        </div>
        {userList.map((user, i) => {
          return (
            <div key={i} className="user-list-item">
              <span>{user.firstName}</span>
              <span>{user.lastName}</span>
              <span>{!!user.isAdmin + ""}</span>
              {currentUser.id !== user.id ? (
                <button onClick={handleAdmin} data-id={user.id}>
                  {!user.isAdmin ? "Make Admin" : "Remove Admin"}
                </button>
              ) : (
                <span style={{ textAlign: "center" }}>Admin</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
