import React, { Component } from "react";
import { IHandlePage } from "../../../../App";

interface ILoginButtonsProps {
  title: string;
  handlePage: IHandlePage;
  handleSidebar: () => void;
}

export default class LoginButton extends Component<ILoginButtonsProps, {}> {
  constructor(props: ILoginButtonsProps) {
    super(props);
  }

  handleOnClick = () => {
    if (window.innerWidth <= 768) {
      this.props.handleSidebar();
    }

    const status = this.props.title === "로그인";
    if (status) {
      return this.props.handlePage("/user/login");
    }

    localStorage.removeItem("x-access-token");

    this.props.handlePage("/");
  };

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
