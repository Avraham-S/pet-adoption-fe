import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [currentUser, setUser] = useState({});
  return (
    <UserContext.Provider value={[currentUser, setUser]}>
      {children}
    </UserContext.Provider>
  );
};
