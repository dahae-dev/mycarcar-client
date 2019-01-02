import * as React from "react";
import { ILoginButtonsProps } from "./ILoginButtons";

export default class LoginButton extends React.Component<ILoginButtonsProps, {}> {
  constructor(props: ILoginButtonsProps) {
    super(props);

    this.handlePage = this.handlePage.bind(this);
  }

  /**
   * 로그인 / 로그아웃 버튼 클릭에 따른 화면 전환 컨트롤
   * 로그아웃 시에는 인증 상태 변경 및 JWT 토큰도 함께 삭제
   */
  handlePage() {
    const status = this.props.title === "로그인";
    if (status) {
      this.props.handlePage("login");
      return this.props.app.forceUpdate();
    }
    this.props.handleAuth(false);
    localStorage.removeItem("x-access-token");
    this.props.handlePage("");
    this.props.app.forceUpdate();
  }

  render() {
    return (
      <div className="btn-wrapper">
        <button className="btn-user" type="button" onClick={this.handlePage}>
          <i className="btn-icon fa fa-sign-in" />
          <span>{this.props.title}</span>
        </button>
      </div>
    );
  }
}
