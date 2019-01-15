import React, { Component } from "react";
import { IHandlePage } from "../../../../App";

interface IRegisterButtonsProps {
  title: string;

  handlePage: IHandlePage;
  handleSidebar: () => void;
}

export default class RegisterButton extends Component<IRegisterButtonsProps> {
  constructor(props: IRegisterButtonsProps) {
    super(props);
  }

  handlePage = () => {
    if (window.innerWidth <= 768) {
      this.props.handleSidebar();
    }

    const status = this.props.title === "회원가입";
    if (status) {
      return this.props.handlePage("/user/terms");
    }

    this.props.handlePage("/user/edit");
  };

  render() {
    return (
      <div className="btn-wrapper">
        <button className="btn-user" type="button" onClick={this.handlePage}>
          <i className="btn-icon fa fa-user" />
          <span>{this.props.title}</span>
        </button>
      </div>
    );
  }
}
