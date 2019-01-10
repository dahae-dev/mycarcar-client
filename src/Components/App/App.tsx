/**
 * 1주차 다해 - 전반적인 레이아웃 및 하위 컴포넌트들을 감싸고 있는 최상위 컴포넌트
 */

import "./App.css";

import React from "react";

import { Header, SideBar, Main, Footer } from "./Layout";

export interface IHandlePage {
  (pathname: string): void;
}

interface IAppState {
  isOpen: boolean;
  isSignedIn: boolean;
  signedInId: string;
  signedInLevel: number;
}

export default class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isOpen: true,
      isSignedIn: localStorage.getItem("x-access-token") ? true : false,
      signedInId: "",
      signedInLevel: 10,
    };

    this.handleSidebar = this.handleSidebar.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
    this.handlePage = this.handlePage.bind(this);
  }

  // App 컴포넌트 마운트 시 호출되는 리액트 라이프사이클 메서드
  componentDidMount() {
    // 브라우저의 back, forward 이벤트 발생시, url에 맞는 화면 전환 컨트롤
    onpopstate = () => {
      this.forceUpdate();
    };

    // 화면 크기 조절에 따른 토글 사이드바 컨트롤
    addEventListener("resize", () => {
      if (window.innerWidth >= 1280) {
        this.setState({ isOpen: true });
      }
      if (window.innerWidth <= 768) {
        this.setState({ isOpen: false });
      }
    });
  }

  // 헤더에 있는 사이드바 토글 버튼 클릭시 각각의 css 적용시켜주는 메서드
  handleSidebar() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  // 인증 상태를 관리해주는 메서드
  handleAuth(result: boolean, id: string, level: number) {
    this.setState({
      isSignedIn: result,
      signedInId: id,
      signedInLevel: level,
    });
  }

  // 사이드바 버튼 클릭 이벤트에 따른 화면 전환을 컨트롤하는 메서드
  handlePage(pathname: string) {
    history.pushState(null, "", pathname);
    this.forceUpdate();
  }

  // 레이아웃 컴포넌트 렌더링
  render() {
    return (
      <div className="grid-container">
        <Header handlePage={this.handlePage} handleSidebar={this.handleSidebar} />

        <SideBar
          isOpen={this.state.isOpen}
          isSignedIn={this.state.isSignedIn}
          signedInId={this.state.signedInId}
          signedInLevel={this.state.signedInLevel}
          handlePage={this.handlePage}
          handleSidebar={this.handleSidebar}
          handleAuth={this.handleAuth}
        />

        <Main
          isOpen={this.state.isOpen}
          isSignedIn={this.state.isSignedIn}
          handleAuth={this.handleAuth}
          handlePage={this.handlePage}
        />

        <Footer isOpen={this.state.isOpen} />
      </div>
    );
  }
}
