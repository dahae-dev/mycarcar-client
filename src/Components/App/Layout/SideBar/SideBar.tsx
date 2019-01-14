import "./SideBar.css";

import React, { Component } from "react";

import Status from "./Status/Status";
import MenuList from "./MenuList/MenuList";
import { IHandlePage } from "../../App";

interface ISidebarProps {
  handlePage: IHandlePage;
  handleSidebar: () => void;
}

export default class SideBar extends Component<ISidebarProps, {}> {
  constructor(props: ISidebarProps) {
    super(props);
  }

  render() {
    const isSidebarOpen = JSON.parse(localStorage.getItem("isSidebarOpen") || "true");

    return (
      <div id="my-sidebar" className={isSidebarOpen ? "show-my-sidebar" : "hide-my-sidebar"}>
        <Status handleSidebar={this.props.handleSidebar} handlePage={this.props.handlePage} />
        <MenuList handlePage={this.props.handlePage} />
      </div>
    );
  }
}
