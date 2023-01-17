import React, { useState } from "react";
import { Modal } from "../Modal/Modal";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import "./Home.css";
import { Login } from "../Login/Login";
import { Signup } from "../Signup/Signup";
import { useUser } from "../../Contexts/UserProvider";
import { useLoggedIn } from "../../Contexts/LoggedInProvider";
import { Search } from "../Search/Search";
import searchIcon from "../../resources/search_FILL0_wght400_GRAD0_opsz48.svg";

const signupButtonContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const Home = ({ signupRef, loginRef, isOpenModal, toggleModal }) => {
  const [isLoggedIn, setIsLoggedIn] = useLoggedIn();
  const [user] = useUser();
  const navigate = useNavigate();
  return (
    <div>
      <Modal isOpen={isOpenModal} toggleModal={toggleModal}>
        <Routes>
          <Route path="login" element={<Login toggleModal={toggleModal} />} />
          <Route path="signup" element={<Signup toggleModal={toggleModal} />} />
          {/* <Route path="search" element={<Search toggleModal={toggleModal} />} /> */}
        </Routes>
      </Modal>

      <div id="main">
        <div id="background-image">
          <div
            style={{
              width: "100%",
              backgroundColor: "#0098b6",
              padding: "0.2rem",
              paddingLeft: "1rem",
            }}
          >
            {" "}
            Welcome, {user.name}
          </div>
          <div id="image-area">
            {/* <div>Welcome, {user.name}</div> */}
            <div>Find the purr-fect match</div>
            <div style={{ fontSize: "2rem" }}>
              Search hundreds of pets waiting to be loved
            </div>
            <div
              id="search-page-button"
              onClick={() => {
                navigate("/search");
              }}
            >
              <div>Search</div>
              <img src={searchIcon} style={{ height: "1.7rem" }} />
            </div>
          </div>
        </div>
        <div id="about-paragraph">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to Pawsitive Adoptions! We
          are dedicated to finding loving homes for animals in need. We have a
          variety of animals available for adoption, including cats, dogs, and
          small mammals. All of our pets have been rescued and are looking for a
          second chance at a happy life. By adopting a pet from us, you are not
          only giving a deserving animal a home, but also supporting our efforts
          to rescue and care for more animals. Thank you for considering
          adoption and for your support of our mission. We hope you find the
          perfect companion here!
        </div>
        {isLoggedIn || (
          <div style={signupButtonContainerStyle}>
            <Link to="signup" onClick={toggleModal} ref={signupRef} />
            <Link to="login" onClick={toggleModal} ref={loginRef} />
          </div>
        )}
      </div>
    </div>
  );
};
