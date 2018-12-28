import * as React from "react";
import "./MenuList.css";
import { type } from "os";

type list = {
  icon: string;
  content: string;
};

class MenuList extends React.Component {
  render() {
    const menus: list[] = [
      { icon: "home", content: "home" },
      { icon: "cab", content: "장기렌트" },
      { icon: "calculator", content: "운용리스" },
      { icon: "television", content: "견적내역보기" }
    ];

    return (
      <div className="menu-wrapper">
        <ul className="menu-list">
          {menus.map((menu: list) => (
            <li key={menu.content}>
              <a href="#">
                <i className={`menu-icon fa fa-${menu.icon}`} />
                {menu.content}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default MenuList;
