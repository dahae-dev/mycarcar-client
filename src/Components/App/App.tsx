import * as React from "react";
import { Header, SideBar, Main, Footer } from "./Layout";
import { IAppState } from "./IApp";
import "./App.css";

export default class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isSignedIn: localStorage.getItem("x-access-token") ? true : false,
      isOpen: false,
      sidebarToggle: "sidebar-open",
      mainToggle: "main-open",
      footerToggle: "footer-open"
    };

    this.handleSidebar = this.handleSidebar.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
  }

  /**
   * 브라우저의 back, forth  버튼 클릭 이벤트 발생시, url에 맞는 화면 전환 컨트롤
   */
  componentDidMount() {
    onpopstate = () => {
      this.forceUpdate();
    };
  }

  /**
   * 사이드바 토글버튼 클릭시 각각의 css 적용
   */
  handleSidebar() {
    this.setState({
      isOpen: !this.state.isOpen,
      sidebarToggle: this.state.isOpen ? "sidebar-open" : "sidebar-close",
      mainToggle: this.state.isOpen ? "main-open" : "main-close",
      footerToggle: this.state.isOpen ? "footer-open" : "footer-close"
    });
  }

  /**
   * 인증 상태 관리
   */
  handleAuth(result: boolean) {
    this.setState({ isSignedIn: result });
  }

  /**
   * 레이아웃 컴포넌트 렌더링
   */
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
