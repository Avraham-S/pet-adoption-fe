import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useLoggedIn } from "../../Contexts/LoggedInProvider";
import companyLogoBlack from "../../resources/pawsitive-adoption-low-resolution-logo-black-on-transparent-background.png";
import companyLogoWhite from "../../resources/pawsitive-adoption-low-resolution-logo-white-on-transparent-background.png";
import { useNavigate } from "react-router-dom";

export const Header = ({ signupRef, loginRef }) => {
  const [isLoggedIn, setIsLoggedIn] = useLoggedIn();
  const navigate = useNavigate();

  return (
    <div id="header">
      <div
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={() => {
          navigate("/home");
        }}
      >
        <img
          src={companyLogoBlack}
          alt=""
          style={{
            height: "5rem",
            width: "7rem",
          }}
        />
        <div
          style={{
            fontWeight: "700",
            fontSize: "3rem",
          }}
        >
          <div>Pawsitive Adoptions</div>
          <div style={{ fontSize: "1rem", textAlign: "start" }}>
            Helping paws, one adoption at a time
          </div>
        </div>
      </div>

      <div
        style={{
          height: "5rem",
          borderLeft: "1.1px solid gray",
          padding: "0 0.2rem",
          display: "flex",
          alignItems: "center",
          fontSize: "1rem",
        }}
      >
        {isLoggedIn ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>Welcome, username</div>
            <div
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                alignSelf: "flex-start",
              }}
              onClick={() => {
                setIsLoggedIn(false);
              }}
            >
              Log out
            </div>
          </div>
        ) : (
          <div id="login-buttons-container">
            <div
              onClick={() => {
                signupRef.current.click();
              }}
              className="signin-button"
            >
              Sign Up
            </div>
            <div
              onClick={() => {
                loginRef.current.click();
              }}
              className="signin-button"
            >
              Log In
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
