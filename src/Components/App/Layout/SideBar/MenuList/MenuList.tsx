/**
 * 1주차
 * 작성자 : 김다해
 * 사이드바에 포함되는 메뉴 리스트 컴포넌트
 *
 * 작성자 : 김재훈
 *
 */

import "./MenuList.css";

import React, { MouseEvent, Component } from "react";

import { getMenus } from "../../../../../util/MenuList";
import { IHandlePage } from "../../../App";

interface IMenuListProps {
  signedInLevel: number;

  handlePage: IHandlePage;
}

export default class MenuList extends Component<IMenuListProps> {
  constructor(props: IMenuListProps) {
    super(props);

    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick(e: MouseEvent) {
    const pathname = e.currentTarget.getAttribute("data-path") || "/";
    this.props.handlePage(pathname);
  }

  render() {
    return (
      <div className="menu-wrapper">
        <ul className="menu-list">
          {getMenus(this.props.signedInLevel).map(menu => (
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
