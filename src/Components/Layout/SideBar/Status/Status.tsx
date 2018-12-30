import * as React from "react";
import "./Status.css";
import axios from "axios";

interface IStatusProps {
  isSignedIn: boolean;
  handleState: (changedState: string) => void;
  handleLogin: (result: boolean) => void;
  handleLogout: () => void;
}

class Status extends React.Component<IStatusProps, {}> {
  constructor(props: IStatusProps) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  /**
   * 로그아웃 시 localStorage에 저장된 JWT 토큰 삭제 및 페이지 이동
   */
  handleLogout() {
    localStorage.removeItem("x-access-token");
    this.props.handleLogout();
    setTimeout(() => {
      this.props.handleState("AfterAuth");
    }, 500);
  }

  render() {
    return (
      <div className="status">
        {!this.props.isSignedIn ? (
          <div className="btn-wrapper">
            <button className="btn-user" type="button" onClick={() => this.props.handleState("Login")}>
              <i className="btn-icon fa fa-sign-in" />
              <span>로그인</span>
            </button>
          </div>
        ) : (
          <div className="btn-wrapper">
            <button className="btn-user" type="button" onClick={() => this.handleLogout()}>
              <i className="btn-icon fa fa-sign-in" />
              <span>로그아웃</span>
            </button>
          </div>
        )}
        {!this.props.isSignedIn ? (
          <div className="btn-wrapper">
            <button className="btn-user" type="button" onClick={() => this.props.handleState("Register")}>
              <i className="btn-icon fa fa-user" />
              <span>회원가입</span>
            </button>
          </div>
        ) : (
          <div className="btn-wrapper">
            <button className="btn-user" type="button" onClick={() => this.props.handleState("Edit")}>
              <i className="btn-icon fa fa-user" />
              <span>정보수정</span>
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Status;
