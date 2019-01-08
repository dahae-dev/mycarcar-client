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
import { getApiPathName } from "../../../../../util/api";
import { getMenus } from "../../../../../util/MenuList";

interface IMenus {
  icon: string;
  content: string;
}

interface IMenuListProps {
  signedInLevel: number;

  handlePage: (pathname: string) => void;
}

interface IMenuListState {
  menus: IMenus[];
}

export default class MenuList extends Component<IMenuListProps, IMenuListState> {
  constructor(props: IMenuListProps) {
    super(props);

    this.state = {
      menus: getMenus(this.props.signedInLevel),
    };

    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick(e: MouseEvent) {
    const pathname = getApiPathName(e.currentTarget.className);
    this.props.handlePage(pathname);
  }

  render() {
    return (
      <div className="menu-wrapper">
        <ul className="menu-list">
          {this.state.menus.map(menu => (
            <li className={menu.content} onClick={this.handleMenuClick} key={menu.content}>
              <i className={`menu-icon fa fa-${menu.icon}`} />
              {menu.content}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
