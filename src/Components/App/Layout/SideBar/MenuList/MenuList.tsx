import "./MenuList.css";

import React, { MouseEvent, Component } from "react";

import { getMenus } from "../../../../../util/MenuList";
import { IHandlePage } from "../../../App";
import parseJwt, { INVALID_JWT } from "../../../../../util/Auth/parseJwt";

interface IMenuListProps {
  handlePage: IHandlePage;
}

export default class MenuList extends Component<IMenuListProps> {
  constructor(props: IMenuListProps) {
    super(props);
  }

  handleMenuClick = (e: MouseEvent<HTMLLIElement>) => {
    if (window.innerWidth <= 768) {
      localStorage.setItem("isSidebarOpen", "false");
    }
    const pathname = e.currentTarget.dataset.path || "/";
    this.props.handlePage(pathname);
  };

  render() {
    const userToken = localStorage.getItem("x-access-token") || "";
    const decodedToken = userToken === "" ? INVALID_JWT : parseJwt(userToken);
    const level = decodedToken.level;

    return (
      <div className="menu-wrapper">
        <ul className="menu-list">
          {getMenus(level).map((menu) => (
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
