import React, { createContext, useContext, useState } from "react";
// import { Navigate } from "react-router-dom";

const LoggedInContext = createContext();

export const useLoggedIn = () => {
  return useContext(LoggedInContext);
};

export const LoggedInProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <LoggedInContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
      {children}
    </LoggedInContext.Provider>
  );
};
