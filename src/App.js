import React, { useRef } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home/Home";
import { ProfileSettings } from "./Components/ProfileSettings/ProfileSettings";
import "./App.css";
import { LoggedInProvider } from "./Contexts/LoggedInProvider";
import { Navbar } from "./Components/Navbar/Navbar";
import { MyPetsPage } from "./Components/MyPetsPage/MyPetsPage";
import { Header } from "./Components/Header/Header";
import { PetPage } from "./Components/PetPage/PetPage";
import { Login } from "./Components/Login/Login";
import { Signup } from "./Components/Signup/Signup";
import { useState } from "react";
import { Modal } from "./Components/Modal/Modal";

function App() {
  const signupRef = useRef();
  const loginRef = useRef();

  const [isOpenModal, setIsOpenModal] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useLoggedIn();

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <LoggedInProvider>
          {isOpenModal ? (
            <div
              id="modal-overlay"
              style={{
                position: "fixed",
                height: "100vh",
                width: "100vw",
                backgroundColor: "#00000030",
              }}
            ></div>
          ) : (
            <></>
          )}
          <Header
            signupRef={signupRef}
            loginRef={loginRef}
            toggleModal={toggleModal}
          />
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route
              path="/home/*"
              element={
                <Home
                  signupRef={signupRef}
                  loginRef={loginRef}
                  isOpenModal={isOpenModal}
                  toggleModal={toggleModal}
                />
              }
            />
            <Route path="/profileSettings" element={<ProfileSettings />} />
            <Route path="/myPets" element={<MyPetsPage />} />
            <Route path="/petPage" element={<PetPage />} />
          </Routes>
        </LoggedInProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
