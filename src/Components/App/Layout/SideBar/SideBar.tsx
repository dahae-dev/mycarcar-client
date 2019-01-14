import "./SideBar.css";

import React from "react";

import Status from "./Status/Status";
import MenuList from "./MenuList/MenuList";
import { IHandlePage } from "../../App";

interface ISidebarProps {
  handlePage: IHandlePage;
  handleSidebar: () => void;
}

const SideBar = (props: ISidebarProps) => {
  const isSidebarOpen = JSON.parse(localStorage.getItem("isSidebarOpen") || "true");

  return (
    <div id="my-sidebar" className={isSidebarOpen ? "show-my-sidebar" : "hide-my-sidebar"}>
      <Status handleSidebar={props.handleSidebar} handlePage={props.handlePage} />
      <MenuList handlePage={props.handlePage} />
    </div>
  );
};

export default SideBar;
