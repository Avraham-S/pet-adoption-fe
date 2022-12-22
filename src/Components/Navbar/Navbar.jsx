import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <div>
      <Link to="/myPets">My Pets</Link>
      {"      "}
      <Link to="/profileSettings">Edit Profile</Link>
      {"      "}

      <Link to="/home">Home</Link>
    </div>
  );
};
