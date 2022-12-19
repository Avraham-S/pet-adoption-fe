import React, { useState } from "react";
import { Modal } from "../Modal/Modal";
import { Route, Routes, Link } from "react-router-dom";
import "./Home.css";
import { Login } from "../Login/Login";
import { Signup } from "../Signup/Signup";

const signupButtonContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const Home = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <div>
      <Modal isOpen={isOpenModal} toggleModal={toggleModal}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Modal>
      <div id="header">
        Pet Adoption{" "}
        <Link to="/search" style={{ fontSize: "1rem" }}>
          Search Pets
        </Link>
      </div>
      <div id="main">
        <div>
          {
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim ipsumeaque fuga sunt dolorum praesentium architecto nam! Laudantium eavoluptatem voluptas modi deleniti aliquam illum assumendaexercitationem qui vitae! Veniam! \n Lorem ipsum dolor sit ametconsectetur, adipisicing elit. Quis, quaerat architecto natus laborum ut corrupti! Ipsum placeat enim omnis ea consequatur necessitatibus     \n     officiis alias autem, quidem, eligendi, \n laudantium blanditii asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit.          Voluptates iusto nam et fugit temporibus reprehenderit, culpa quis,   quisquam beatae ullam cupiditate enim ipsum nostrum! Porro dolorum eius aut maiores consectetur."
          }
        </div>
        <div style={signupButtonContainerStyle}>
          <Link to="/signup">
            <button id="signup-button" onClick={toggleModal}>
              Sign Up
            </button>
          </Link>
          <div>
            Already have an account?{" "}
            <Link to="/login" onClick={toggleModal}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
