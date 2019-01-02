import * as React from "react";
import { IRegisterButtonsProps } from "./IRegisterButtons";

export default class RegisterButton extends React.Component<IRegisterButtonsProps, {}> {
  constructor(props: IRegisterButtonsProps) {
    super(props);

    this.handlePage = this.handlePage.bind(this);
  }

  /**
   * 회원가입 / 정보수정 버튼 클릭에 따른 화면 전환 컨트롤
   */
  handlePage() {
    const status = this.props.title === "회원가입";
    if (status) {
      this.props.handlePage("terms");
      return this.props.app.forceUpdate();
    }
    this.props.handlePage("edit_account");
    this.props.app.forceUpdate();
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
