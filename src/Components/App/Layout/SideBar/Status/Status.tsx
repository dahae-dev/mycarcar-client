/**
 * 1주차 다해 - 인증 상태에 따라 각각 다른 버튼이 렌더링 되는 컴포넌트
 * 로그인 시 로그인된 아이디 및 권한 그룹에 대한 표시도 여기서 이루어져야함
 */

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

  // 사이드바 버튼 클릭 이벤트에 따른 화면 전환을 컨트롤하는 메서드
  handlePage(pathname: string) {
    history.pushState(null, "", `/${pathname}`);
  }

  render() {
    // 로그인하여 인증이 된 경우, 로그아웃/정보수정 버튼 렌더링
    if (this.props.isSignedIn) {
      return (
        <div className="status">
          <LoginButtons
            title="로그아웃"
            handlePage={this.handlePage}
            handleAuth={this.props.handleAuth}
            handleSidebar={this.props.handleSidebar}
            app={this.props.app}
          />
          <RegisterButtons
            title="정보수정"
            handlePage={this.handlePage}
            handleSidebar={this.props.handleSidebar}
            app={this.props.app}
          />
        </div>
      );
    }

    // 인증이 안 된 경우, 로그인/회원가입 버튼 렌더링
    return (
      <div className="status">
        <LoginButtons
          title="로그인"
          handlePage={this.handlePage}
          handleAuth={this.props.handleAuth}
          handleSidebar={this.props.handleSidebar}
          app={this.props.app}
        />
        <RegisterButtons
          title="회원가입"
          handlePage={this.handlePage}
          handleSidebar={this.props.handleSidebar}
          app={this.props.app}
        />
      </div>
    );
  }
}
