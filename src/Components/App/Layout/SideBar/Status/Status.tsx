import * as React from "react";
import LoginButtons from "./LoginButtons/LoginButtons";
import RegisterButtons from "./RegisterButtons/RegisterButtons";
import { IStatusProps } from "./IStatus";
import "./Status.css";

export default class Status extends React.Component<IStatusProps, {}> {
  constructor(props: IStatusProps) {
    super(props);

    this.handlePage = this.handlePage.bind(this);
  }

  /**
   * 사이드바 버튼 클릭 이벤트에 따른 화면 전환 컨트롤
   */
  handlePage(pathname: string) {
    history.pushState(null, "", `/${pathname}`);
  }

  render() {
    if (this.props.isSignedIn) {
      return (
        <div className="status">
          <LoginButtons
            title="로그아웃"
            handlePage={this.handlePage}
            handleAuth={this.props.handleAuth}
            app={this.props.app}
          />
          <RegisterButtons title="정보수정" handlePage={this.handlePage} app={this.props.app} />
        </div>
      );
    }

    return (
      <div className="status">
        <LoginButtons
          title="로그인"
          handlePage={this.handlePage}
          handleAuth={this.props.handleAuth}
          app={this.props.app}
        />
        <RegisterButtons title="회원가입" handlePage={this.handlePage} app={this.props.app} />
      </div>
    );
  }
}
