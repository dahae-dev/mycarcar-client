/**
 * 1주차 다해 - 인증 상태에 따라 각각 다른 버튼이 렌더링 되는 컴포넌트
 * 로그인 시 로그인된 아이디 및 권한 그룹에 대한 표시도 여기서 이루어져야함
 */

import "./Status.css";
import React from "react";
import LoginButtons from "./LoginButtons/LoginButtons";
import RegisterButtons from "./RegisterButtons/RegisterButtons";

interface IStatusProps {
  isSignedIn: boolean;

  handlePage: (pathname: string) => void;
  handleAuth: (result: boolean, id: string, level: number) => void;
  handleSidebar: () => void;
}

export default class Status extends React.Component<IStatusProps, {}> {
  constructor(props: IStatusProps) {
    super(props);
  }

  render() {
    // 로그인하여 인증이 된 경우, 로그아웃/정보수정 버튼 렌더링
    if (this.props.isSignedIn) {
      return (
        <div className="status">
          <LoginButtons
            title="로그아웃"
            handlePage={this.props.handlePage}
            handleAuth={this.props.handleAuth}
            handleSidebar={this.props.handleSidebar}
          />
          <RegisterButtons
            title="정보수정"
            handlePage={this.props.handlePage}
            handleSidebar={this.props.handleSidebar}
          />
        </div>
      );
    }

    // 인증이 안 된 경우, 로그인/회원가입 버튼 렌더링
    return (
      <div className="status">
        <LoginButtons
          title="로그인"
          handlePage={this.props.handlePage}
          handleAuth={this.props.handleAuth}
          handleSidebar={this.props.handleSidebar}
        />
        <RegisterButtons title="회원가입" handlePage={this.props.handlePage} handleSidebar={this.props.handleSidebar} />
      </div>
    );
  }
}
