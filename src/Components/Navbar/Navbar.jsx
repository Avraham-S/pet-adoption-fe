import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useLoggedIn } from "../../Contexts/LoggedInProvider";
import { useUser } from "../../Contexts/UserProvider";

export const Navbar = () => {
  const [isLoggedIn] = useLoggedIn();
  const [user] = useUser();
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
            Settings
          </Link>
          {user.isAdmin && (
            <>
              <Link to="/addPet" className="nav-item">
                Add Pet
              </Link>
              <Link to="/adminPage" className="nav-item">
                Admin
              </Link>
            </>
          )}
        </>
      )}
    </div>
  );
};
