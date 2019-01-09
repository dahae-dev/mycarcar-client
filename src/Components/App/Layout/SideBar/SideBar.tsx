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
  isOpen: boolean;
  isSignedIn: boolean;
  signedInId: string;
  signedInLevel: number;

  handlePage: IHandlePage;
  handleAuth: (result: boolean, id: string, level: number) => void;
  handleSidebar: () => void;
}

export default class SideBar extends React.Component<ISidebarProps, {}> {
  constructor(props: ISidebarProps) {
    super(props);
  }

  render() {
    return (
      <div id="my-sidebar" className={this.props.isOpen ? "show-my-sidebar" : "hide-my-sidebar"}>
        <Status
          isSignedIn={this.props.isSignedIn}
          handleAuth={this.props.handleAuth}
          handleSidebar={this.props.handleSidebar}
          handlePage={this.props.handlePage}
        />
        <MenuList signedInLevel={this.props.signedInLevel} handlePage={this.props.handlePage} />
      </div>
    );
  }
}
