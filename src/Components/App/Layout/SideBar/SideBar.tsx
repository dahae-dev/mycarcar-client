/**
 * 1주차 다해 - 레이아웃 좌측 사이드바 컴포넌트.
 * 인증 상태에 따라 변경되는 로그인/로그아웃, 회원가입/정보수정 버튼이 있는 Status 컴포넌트와 MenuList 컴포넌트 렌더링
 */

import "./SideBar.css";

import React from "react";

import Status from "./Status/Status";
import MenuList from "./MenuList/MenuList";
import { IHandlePage } from "../../App";

interface ISidebarProps {
  handlePage: IHandlePage;
  handleSidebar: () => void;
}

export default class SideBar extends React.Component<ISidebarProps, {}> {
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
