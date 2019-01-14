import "./Status.css";

import React from "react";

import LoginButtons from "./LoginButtons/LoginButtons";
import RegisterButtons from "./RegisterButtons/RegisterButtons";
import { IHandlePage } from "../../../App";

interface IStatusProps {
  handlePage: IHandlePage;
  handleSidebar: () => void;
}

export default class Status extends React.Component<IStatusProps, {}> {
  constructor(props: IStatusProps) {
    super(props);
  }

  render() {
    const isSignedIn = localStorage.getItem("isSignedIn");
    if (isSignedIn) {
      return (
        <div className="status">
          <LoginButtons title="로그아웃" handlePage={this.props.handlePage} handleSidebar={this.props.handleSidebar} />
          <RegisterButtons
            title="정보수정"
            handlePage={this.props.handlePage}
            handleSidebar={this.props.handleSidebar}
          />
        </div>
      );
    }

    return (
      <div className="status">
        <LoginButtons title="로그인" handlePage={this.props.handlePage} handleSidebar={this.props.handleSidebar} />
        <RegisterButtons title="회원가입" handlePage={this.props.handlePage} handleSidebar={this.props.handleSidebar} />
      </div>
    );
  }
}
