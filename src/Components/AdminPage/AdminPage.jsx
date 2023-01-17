import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoggedIn } from "../../Contexts/LoggedInProvider";
import { useUser } from "../../Contexts/UserProvider";
import { Navbar } from "../Navbar/Navbar";
import "./AdminPage.css";

export const AdminPage = () => {
  const [userList, setUserList] = useState([]);
  const [petsList, setPetsList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useLoggedIn();
  const [userInfo, setUserInfo] = useState({});
  const [currentUser] = useUser();
  const navigate = useNavigate();
  const userListRef = useRef();

  const highlightActive = (e) => {
    const list = Array.from(userListRef.current.children);
    list.forEach((listEl) => {
      if (listEl.classList.contains("active"))
        listEl.classList.remove("active");
    });
    e.target.closest("div").classList.add("active");
  };

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
      if (error.response.status === 401) setIsLoggedIn(false);
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
      if (error.response.status === 401) setIsLoggedIn(false);
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

  const getUsersPets = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:8080/pets/user/${id}`);
      setPetsList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getFullUserInfo = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:8080/users/${id}`);
      setUserInfo(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUsersPetsAndInfo = (e) => {
    if (e.target.tagName === "BUTTON") return;
    const { id } = e.target.closest("div").dataset;
    highlightActive(e);
    getFullUserInfo(id);
    getUsersPets(id);
  };

  useEffect(() => {
    if (!isLoggedIn) navigate("/home");
  });

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          padding: "1.5rem",
        }}
      >
        <div className="user-list-container" ref={userListRef}>
          <h3>Users ({userList.length})</h3>
          <div className="user-list-item">
            <span>First Name</span>
            <span>Last Name</span>
            <span>Admin</span>
          </div>
          {userList.map((user, i) => {
            return (
              <div
                key={i}
                className="user-list-item"
                data-id={user.id}
                onClick={handleUsersPetsAndInfo}
              >
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
        <div>
          <h3>Info</h3>
          <div className="user-list-item">
            <span>
              Email: <br /> {userInfo.email}
            </span>
            <span>
              Phone: <br /> {userInfo.phone}
            </span>
            <span>
              Name: <br />
              {userInfo.lastName}, {userInfo.firstName}
            </span>
          </div>
          <div className="user-list-container" style={{ marginTop: "1rem" }}>
            <h3>Pets ({petsList.length})</h3>
            <div className="user-list-item">
              <span>Name</span>
              <span>ID</span>
              <span>Status</span>
            </div>
            {petsList.length ? (
              petsList.map((pet, i) => {
                return (
                  <div key={i} className="user-list-item">
                    <span>{pet.name}</span>
                    <span>{pet.petId}</span>
                    <span>{pet.adoptionStatus}</span>
                    <Link to={`/petPage/?id=${pet.petId}`}>Page</Link>
                  </div>
                );
              })
            ) : (
              <div className="user-list-item">No Pets</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
