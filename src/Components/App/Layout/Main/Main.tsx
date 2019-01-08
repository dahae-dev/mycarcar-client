/**
 * 1주차 다해 - 레이아웃 메인 컴포넌트. 주로 이 컴포넌트의 내용이 업데이트되며 렌더링 됨.
 */

import "./Main.css";
import React from "react";
import { Home, RegisterForm, LoginForm, EditForm, RegisterTerms } from "./Content";

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
    const isLoginPage = location.pathname === "/login";
    const isTermsPage = location.pathname === "/terms";
    const isRegisterPage = location.pathname === "/register";
    const isEditPage = location.pathname === "/edit_account";

    if (isLoginPage) {
      return (
        <LoginForm handlePage={this.props.handlePage} handleAuth={this.props.handleAuth} isOpen={this.props.isOpen} />
      );
    }

    if (isTermsPage) {
      return <RegisterTerms handlePage={this.props.handlePage} isOpen={this.props.isOpen} />;
    }

    if (isRegisterPage) {
      return <RegisterForm handlePage={this.props.handlePage} isOpen={this.props.isOpen} />;
    }

    if (isEditPage) {
      return (
        <EditForm handlePage={this.props.handlePage} handleAuth={this.props.handleAuth} isOpen={this.props.isOpen} />
      );
    }

    return <Home isOpen={this.props.isOpen} />;
  }
}
