/**
 * 1주차 다해 - 레이아웃 메인 컴포넌트. 주로 이 컴포넌트의 내용이 업데이트되며 렌더링 됨.
 */

import "./Main.css";

import React from "react";

import Home from "./Home/Home";
import LoginForm from "./Login/LoginForm";
import EditForm from "./EditAccount/EditForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import RegisterTerms from "./RegisterTerms/RegisterTerms";

interface IMainProps {
  isOpen: boolean;
  isSignedIn: boolean;

  handlePage: (pathname: string) => void;
  handleAuth: (result: boolean, id: string, level: number) => void;
}

export default class Main extends React.Component<IMainProps, {}> {
  constructor(props: IMainProps) {
    super(props);
  }

  // url 주소창의 endpoint에 따른 화면 전환
  render() {
    const pathname = location.pathname;

    // TODO
    const isRentalPage = pathname === "rental";
    const isCarListPage = pathname === "rental";
    const isCatalogPage = pathname === "rental";
    const isMemberListPage = pathname === "rental";

    switch (pathname) {
      case "/login":
        return (
          <LoginForm handlePage={this.props.handlePage} handleAuth={this.props.handleAuth} isOpen={this.props.isOpen} />
        );
      case "/terms":
        return <RegisterTerms handlePage={this.props.handlePage} isOpen={this.props.isOpen} />;
      case "/register":
        return <RegisterForm handlePage={this.props.handlePage} isOpen={this.props.isOpen} />;
      case "/edit_account":
        return (
          <EditForm handlePage={this.props.handlePage} handleAuth={this.props.handleAuth} isOpen={this.props.isOpen} />
        );
      default:
        return <Home isOpen={this.props.isOpen} />;
    }
  }
}
