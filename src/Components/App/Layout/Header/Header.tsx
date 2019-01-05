/**
 * 1주차 다해 - 레이아웃 최상단 Header 컴포넌트, 로고이미지와 사이드바 토글버튼 렌더링
 */

import * as React from "react";
import { IHeaderProps } from "./IHeader";
import logo from "./assets/img/logo.png";
import "./Header.css";

export default class Header extends React.Component<IHeaderProps> {
  constructor(props: IHeaderProps) {
    super(props);

    this.handlePage = this.handlePage.bind(this);
  }

  // 로고 이미지 클릭 이벤트 발생 시 홈화면으로 전환시켜주는 메서드
  handlePage() {
    history.pushState(null, "", "/");
    return this.props.app.forceUpdate();
  }

  render() {
    return (
      <header id="my-header">
        <a className="logo-container">
          <img
            className="logo-image"
            src={logo}
            alt="mycarcar logo"
            onClick={this.handlePage}
          />
        </a>
        <a className="toggle-btn" onClick={this.props.handleSidebar}>
          <i className="fa fa-bars" />
        </a>
      </header>
    );
  }
}
