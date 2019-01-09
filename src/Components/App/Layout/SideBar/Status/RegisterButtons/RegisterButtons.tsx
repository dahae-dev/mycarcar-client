/**
 * 1주차 다해 - 회원가입 or 정보수정 버튼 컴포넌트
 */

import React from "react";
import { IHandlePage } from "../../../../App";

interface IRegisterButtonsProps {
  title: string;

  handlePage: IHandlePage;
  handleSidebar: () => void;
}

export default class RegisterButton extends React.Component<IRegisterButtonsProps> {
  constructor(props: IRegisterButtonsProps) {
    super(props);

    this.handlePage = this.handlePage.bind(this);
  }

  // 회원가입 or 정보수정 버튼 클릭에 따른 화면 전환을 컨트롤하는 메서드
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
