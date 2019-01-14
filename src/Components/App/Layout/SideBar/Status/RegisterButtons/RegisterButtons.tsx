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

    this.handlePage = this.handlePage.bind(this);
  }

  handlePage() {
    if (window.innerWidth <= 768) {
      this.props.handleSidebar();
    }

    const status = this.props.title === "회원가입";
    if (status) {
      return this.props.handlePage("/terms");
    }

    this.props.handlePage("/edit_account");
  }

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
