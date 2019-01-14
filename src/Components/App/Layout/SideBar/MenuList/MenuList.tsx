import "./MenuList.css";

import React, { MouseEvent, Component } from "react";

import { getMenus } from "../../../../../util/MenuList";
import { IHandlePage } from "../../../App";

interface IMenuListProps {
  handlePage: IHandlePage;
}

export default class MenuList extends Component<IMenuListProps> {
  constructor(props: IMenuListProps) {
    super(props);
  }

  handleMenuClick = (e: MouseEvent) => {
    const pathname = e.currentTarget.getAttribute("data-path") || "/";
    this.props.handlePage(pathname);
  };

  render() {
    const signedInLevel = JSON.parse(localStorage.getItem("signedInLevel") || "0");
    return (
      <div className="menu-wrapper">
        <ul className="menu-list">
          {getMenus(signedInLevel).map((menu) => (
            <li className={menu.content} onClick={this.handleMenuClick} key={menu.content} data-path={menu.path}>
              <i className={`menu-icon fa fa-${menu.icon}`} />
              {menu.content}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
