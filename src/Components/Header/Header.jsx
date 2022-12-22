import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useLoggedIn } from "../../Contexts/LoggedInProvider";
import companyLogoBlack from "../../resources/pawsitive-adoption-low-resolution-logo-black-on-transparent-background.png";
import companyLogoWhite from "../../resources/pawsitive-adoption-low-resolution-logo-white-on-transparent-background.png";

export const Header = ({ signupRef, loginRef, toggleModal }) => {
  const [isLoggedIn] = useLoggedIn();
  const style = {
    height: "fit-content",
    backgroundColor: "#00aaff",
    fontSize: "1rem",
    display: "flex",
    padding: "0.5rem",
    alignItems: "center",
    justifyContent: "space-between",
  };
  return (
    <div style={style}>
      <div style={{ display: "flex", alignItems: "center" }}>
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
          Pawsitive Adoptions
        </div>
      </div>
      <div>
        {isLoggedIn ? (
          "Welcome, username"
        ) : (
          <div>
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
        {/* <div>
          <Link to="signup" onClick={toggleModal} ref={signupRef} />
          <Link to="login" onClick={toggleModal} ref={loginRef} />
        </div> */}
      </div>
    </div>
  );
};
