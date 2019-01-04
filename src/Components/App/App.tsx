/**
 * 전반적인 레이아웃 및 하위 컴포넌트들을 감싸고 있는 최상위 컴포넌트
 */

import * as React from "react";
import { Header, SideBar, Main, Footer } from "./Layout";
import { IAppState } from "./IApp";
import "./App.css";

export default class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      // 인증 상태
      isSignedIn: localStorage.getItem("x-access-token") ? true : false,
      // 사이드바 토글 기능을 위한 state -> bootstrap 적용시 삭제 가능
      isOpen: false,
      sidebarToggle: "sidebar-open",
      mainToggle: "main-open",
      footerToggle: "footer-open"
    };

    this.handleSidebar = this.handleSidebar.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
  }

  // App 컴포넌트 마운트 시 호출되는 리액트 라이프사이클 메서드
  componentDidMount() {
    // 브라우저의 back, forward 이벤트 발생시, url에 맞는 화면 전환 컨트롤
    onpopstate = () => {
      this.forceUpdate();
    };

    // 화면 크기 조절에 따른 토글 사이드바 컨트롤
    addEventListener("resize", () => {
      if (window.innerWidth <= 768) {
        this.setState({
          isOpen: !this.state.isOpen,
          sidebarToggle: "sidebar-close",
          mainToggle: "main-close",
          footerToggle: "footer-close"
        });
      }
      if (window.innerWidth >= 1280) {
        this.setState({
          isOpen: !this.state.isOpen,
          sidebarToggle: "sidebar-open",
          mainToggle: "main-open",
          footerToggle: "footer-open"
        });
      }
    });
  }

  // 헤더에 있는 사이드바 토글 버튼 클릭시 각각의 css 적용시켜주는 메서드
  handleSidebar() {
    this.setState({
      isOpen: !this.state.isOpen,
      sidebarToggle: this.state.isOpen ? "sidebar-open" : "sidebar-close",
      mainToggle: this.state.isOpen ? "main-open" : "main-close",
      footerToggle: this.state.isOpen ? "footer-open" : "footer-close"
    });
  }

  // 인증 상태를 관리해주는 메서드
  handleAuth(result: boolean) {
    this.setState({ isSignedIn: result });
  }

  // 레이아웃 컴포넌트 렌더링
  render() {
    return (
      <div className="grid-container">
        <Header handleSidebar={this.handleSidebar} app={this} />

        <SideBar
          sidebarToggle={this.state.sidebarToggle}
          isSignedIn={this.state.isSignedIn}
          handleAuth={this.handleAuth}
          app={this}
        />

        <Main
          mainToggle={this.state.mainToggle}
          isSignedIn={this.state.isSignedIn}
          handleAuth={this.handleAuth}
          app={this}
        />
        <Footer footerToggle={this.state.footerToggle} />
      </div>
    );
  }
}
