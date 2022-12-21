import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  const style = {
    height: "3rem",
    backgroundColor: "aquamarine",
    fontSize: "1rem",
    textAlign: "center",
  };
  return (
    <div style={style}>
      <div>Welcome to (put company name here)</div>
      <Link to="/myPets">My Pets</Link>
      {"      "}
      <Link to="/profileSettings">Edit Profile</Link>
      {"      "}

      <Link to="/home">Home</Link>
    </div>
  );
};
