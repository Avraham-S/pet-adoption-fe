import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import { useLoggedIn } from "../../Contexts/LoggedInProvider";
import companyLogoBlack from "../../resources/pawsitive-adoption-low-resolution-logo-black-on-transparent-background.png";
import companyLogoWhite from "../../resources/pawsitive-adoption-low-resolution-logo-white-on-transparent-background.png";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Contexts/UserProvider";

export const Header = ({ signupRef, loginRef, toggleModal }) => {
  const [isLoggedIn, setIsLoggedIn] = useLoggedIn();
  const [user] = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const navigateHome = (route) => {
    // if (location.pathname !== "/home")
    navigate(`/home/${route}`);
    toggleModal();
  };

  return (
    <div style={{ height: "6rem" }}>
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
              <div
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  alignSelf: "flex-start",
                }}
                onClick={() => {
                  navigate("/profile");
                }}
              >
                Profile
              </div>
              {user.isAdmin && (
                <div
                  style={{
                    textDecoration: "underline",
                    cursor: "pointer",
                    alignSelf: "flex-start",
                  }}
                  onClick={() => {
                    navigate("/adminPage");
                  }}
                >
                  Admin
                </div>
              )}
              <div
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  alignSelf: "flex-start",
                }}
                onClick={() => {
                  setIsLoggedIn(false);
                  localStorage.removeItem("token");
                }}
              >
                Log out
              </div>
            </div>
          ) : (
            <div id="login-buttons-container">
              <div
                onClick={() => {
                  navigateHome("signup");
                }}
                className="signin-button"
              >
                Sign Up
              </div>
              <div
                onClick={() => {
                  navigateHome("login");
                }}
                className="signin-button"
              >
                Log In
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
