import "./Footer.css";

import React from "react";

const Footer = () => {
  const isSidebarOpen = JSON.parse(localStorage.getItem("isSidebarOpen") || "true");
  return (
    <div id="my-footer" className={isSidebarOpen ? "" : "my-footer-margin-left"}>
      <div id="ft-copy">
        Copyright &copy; <b>mycarcar.com</b> All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
