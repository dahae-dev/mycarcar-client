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
import Rental from "./Rental/Rental";
import { IHandlePage } from "../../App";
import SuperUser from "./SuperUser/SuperUser";

interface ICommonAttribute {
  isSidebarOpen: boolean;

  handlePage: IHandlePage;
}

interface IMainProps {
  isSidebarOpen: boolean;
  isSignedIn: boolean;

  handlePage: IHandlePage;
  handleAuth: (result: boolean, id: string, level: number) => void;
}

interface IMainState {
  commonAttribute: ICommonAttribute;
}

export default class Main extends React.Component<IMainProps, IMainState> {
  constructor(props: IMainProps) {
    super(props);

    this.state = {
      commonAttribute: {
        handlePage: this.props.handlePage,
        isSidebarOpen: this.props.isSidebarOpen,
      },
    };
  }

  // url 주소창의 endpoint에 따른 화면 전환
  render() {
    const pathname = location.pathname;
    const commonAttribute = this.state.commonAttribute;

    switch (pathname) {
      case "/login":
        return <LoginForm {...commonAttribute} handleAuth={this.props.handleAuth} />;
      case "/terms":
        return <RegisterTerms {...commonAttribute} />;
      case "/register":
        return <RegisterForm {...commonAttribute} />;
      case "/edit_account":
        return <EditForm {...commonAttribute} handleAuth={this.props.handleAuth} />;
      case "/rental":
        return <Rental {...commonAttribute} />;
      case "":
        return <SuperUser {...commonAttribute} />;
      default:
        return <Home {...commonAttribute} />;
    }
  }
}
