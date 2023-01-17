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
          {user.isAdmin && (
            <>
              <Link to="/addPet" className="nav-item">
                Add Pet
              </Link>
            </>
          )}
        </>
      )}
    </div>
  );
};
