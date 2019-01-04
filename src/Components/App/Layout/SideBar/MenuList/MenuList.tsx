/**
 * 사이드바에 포함되는 메뉴 리스트 컴포넌트
 */

import * as React from "react";
import { IList } from "./IMenuList";
import "./MenuList.css";

export default class MenuList extends React.Component {
  render() {
    const menus: IList[] = [
      { icon: "home", content: "home" },
      { icon: "cab", content: "장기렌트" },
      { icon: "calculator", content: "운용리스" },
      { icon: "television", content: "견적내역보기" }
    ];

    return (
      <div className="menu-wrapper">
        <ul className="menu-list">
          {menus.map((menu: IList) => (
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
