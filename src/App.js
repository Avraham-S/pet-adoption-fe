import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home/Home";
import { ProfileSettings } from "./Components/ProfileSettings/ProfileSettings";
import "./App.css";
import { LoggedInProvider } from "./Contexts/LoggedInProvider";
import { Header } from "./Components/Header/Header";
import { MyPetsPage } from "./Components/MyPetsPage/MyPetsPage";
import { PetPage } from "./Components/PetPage/PetPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <LoggedInProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home/*" element={<Home />} />
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
