import React, { useState } from "react";
import { Modal } from "../Modal/Modal";
import { Route, Routes, Link } from "react-router-dom";
import "./Home.css";
import { Login } from "../Login/Login";
import { Signup } from "../Signup/Signup";
import { useLoggedIn } from "../../Contexts/LoggedInProvider";
import { Header } from "../Header/Header";

const signupButtonContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const Home = ({ signupRef, loginRef, isOpenModal, toggleModal }) => {
  // const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useLoggedIn();

  // const toggleModal = () => {
  //   setIsOpenModal(!isOpenModal);
  // };

  return (
    <div>
      <Modal isOpen={isOpenModal} toggleModal={toggleModal}>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </Modal>
      <div id="header">
        Pet Adoption
        <Link to="/search" style={{ fontSize: "1rem" }}>
          Search Pets
        </Link>
      </div>
      <button
        onClick={() => {
          setIsLoggedIn(!isLoggedIn);
        }}
      >
        Toggle Login
      </button>
      <div id="main">
        <div>
          Welcome to our pet adoption website! We are dedicated to finding
          loving homes for animals in need. We have a variety of animals
          available for adoption, including cats, dogs, and small mammals. All
          of our pets have been rescued and are looking for a second chance at a
          happy life. By adopting a pet from us, you are not only giving a
          deserving animal a home, but also supporting our efforts to rescue and
          care for more animals. Thank you for considering adoption and for your
          support of our mission. We hope you find the perfect companion here!
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
