import React from "react";
import { NavBar } from "./NavBar";

const PageLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default PageLayout;
