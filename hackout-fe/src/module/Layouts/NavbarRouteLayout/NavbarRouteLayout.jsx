import React from "react";
import Navbar from "../../Navbar/Navbar";

function NavbarRouteLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default NavbarRouteLayout;
