/**
 * 1주차 다해 - 로그인 or 로그아웃 버튼 컴포넌트
 */

import React from "react";
import { IHandlePage, IHandleAuth } from "../../../../App";

interface ILoginButtonsProps {
  title: string;
  handlePage: IHandlePage;
  handleAuth: IHandleAuth;
  handleSidebar: () => void;
}

export default class LoginButton extends React.Component<ILoginButtonsProps, {}> {
  constructor(props: ILoginButtonsProps) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  // 로그인 or 로그아웃 버튼 클릭에 따른 화면 전환을 컨트롤하는 메서드
  handleOnClick() {
    if (window.innerWidth <= 768) {
      this.props.handleSidebar();
    }

    const status = this.props.title === "로그인";
    if (status) {
      return this.props.handlePage("/login");
    }

    // 로그아웃 시에는 인증 상태 변경 및 JWT 토큰도 함께 삭제
    this.props.handleAuth(false, "", 0);
    localStorage.removeItem("x-access-token");
    this.props.handlePage("/");
  }

  render() {
    return (
      <div className="btn-wrapper">
        <button className="btn-user" type="button" onClick={this.handleOnClick}>
          <i className="btn-icon fa fa-sign-in" />
          <span>{this.props.title}</span>
        </button>
      </div>
    );
  }
}
