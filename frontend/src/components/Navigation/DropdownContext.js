import React, { createContext, useContext, useState } from "react";

const DropdownContext = createContext();

export const useDropdown = () => {
  return useContext(DropdownContext);
};

export const DropdownProvider = ({ children }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <DropdownContext.Provider value={{ activeDropdown, setActiveDropdown }}>
      {children}
    </DropdownContext.Provider>
  );
};
