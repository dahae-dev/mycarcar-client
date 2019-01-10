/**
 * 1주차 다해 - 레이아웃 최상단 Header 컴포넌트, 로고이미지와 사이드바 토글버튼 렌더링
 */

import "./Header.css";
import logo from "assets/img/logo.png";
import React from "react";
import { IHandlePage } from "../../App";

interface IHeaderProps {
  handleSidebar: () => void;
  handlePage: IHandlePage;
}

export default class Header extends React.Component<IHeaderProps> {
  constructor(props: IHeaderProps) {
    super(props);

    this.handleLogoClick = this.handleLogoClick.bind(this);
  }

  // 로고 이미지 클릭 이벤트 발생 시 홈화면으로 전환시켜주는 메서드
  handleLogoClick() {
    this.props.handlePage("/");
  }

  render() {
    return (
      <header id="my-header">
        <a className="logo-container">
          <img className="logo-image" src={logo} alt="mycarcar logo" onClick={this.handleLogoClick} />
        </a>
        <a className="toggle-btn" onClick={this.props.handleSidebar}>
          <i className="fa fa-bars" />
        </a>
      </header>
    );
  }
}
