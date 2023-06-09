import React, { useRef } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Home } from "./Components/Home/Home";
import { ProfileSettings } from "./Components/ProfileSettings/ProfileSettings";
import "./App.css";
import { LoggedInProvider } from "./Contexts/LoggedInProvider";
import { Navbar } from "./Components/Navbar/Navbar";
import { MyPetsPage } from "./Components/MyPetsPage/MyPetsPage";
import { Header } from "./Components/Header/Header";
import { PetPage } from "./Components/PetPage/PetPage";
import { useState } from "react";
import { AddPetForm } from "./Components/AddPetForm/AddPetForm";
import { Search } from "./Components/Search/Search";
import { UserProvider } from "./Contexts/UserProvider";
import { AdminPage } from "./Components/AdminPage/AdminPage";
import { NotFound } from "./Components/NotFound/NotFound";
import { ProfilePage } from "./Components/ProfilePage/ProfilePage";

function App() {
  const signupRef = useRef();
  const loginRef = useRef();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <UserProvider>
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
                onClick={toggleModal}
              ></div>
            ) : (
              <></>
            )}
            <Header
              signupRef={signupRef}
              loginRef={loginRef}
              toggleModal={toggleModal}
            />
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
              <Route path="/addPet" element={<AddPetForm />} />
              <Route path="/search" element={<Search />} />
              <Route path="/adminPage" element={<AdminPage />} />
              <Route path="/editPet" element={<AddPetForm isEdit={true} />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </LoggedInProvider>
        </UserProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
