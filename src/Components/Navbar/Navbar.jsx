import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useLoggedIn } from "../../Contexts/LoggedInProvider";

export const Navbar = () => {
  const [isLoggedIn] = useLoggedIn();
  return (
    <div id="navbar">
      {isLoggedIn && (
        <>
          <Link to="/home" className="nav-item">
            Home
          </Link>
          <Link to="/myPets" className="nav-item">
            My Pets
          </Link>
          <Link to="/profileSettings" className="nav-item">
            Edit Profile
          </Link>
        </>
      )}
    </div>
  );
};
