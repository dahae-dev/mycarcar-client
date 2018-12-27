import * as React from "react";
import "./Status.css";

interface IStatusProps {
  isSignedIn: boolean;
  handleClickLogin: () => void;
  handleClickLogout: () => void;
  handleClickRegister: () => void;
}

class Status extends React.Component<IStatusProps, {}> {
  constructor(props: IStatusProps) {
    super(props);
  }

  render() {
    return (
      <div className="status">
        {!this.props.isSignedIn ? (
          <div className="btn-wrapper">
            <button className="btn-user" type="button" onClick={() => this.props.handleClickLogin()}>
              <i className="btn-icon fa fa-sign-in" />
              <span>로그인</span>
            </button>
          </div>
        ) : (
          <div className="btn-wrapper">
            <button className="btn-user" type="button" onClick={() => this.props.handleClickLogout()}>
              <i className="btn-icon fa fa-sign-in" />
              <span>로그아웃</span>
            </button>
          </div>
        )}
        <div className="btn-wrapper">
          <button className="btn-user" type="button" onClick={() => this.props.handleClickRegister()}>
            <i className="btn-icon fa fa-user" />
            <span>회원가입</span>
          </button>
        </div>
      </div>
    );
  }
}

export default Status;
