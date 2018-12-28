import * as React from "react";
import "./Status.css";
import axios from "axios";

interface IStatusProps {
  isSignedIn: boolean;
  handleClick: (comp: string) => void;
  handleLogin: (result: boolean) => void;
  handleLogout: () => void;
}

const config: object = {
  headers: { "x-access-token": localStorage.getItem("x-access-token") }
};

class Status extends React.Component<IStatusProps, {}> {
  constructor(props: IStatusProps) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    axios
      .get(`http://localhost:5000/api/logout`, config)
      .then(res => {
        const result = res.data.isSignedOut;
        if (result) {
          localStorage.removeItem("x-access-token");
          this.props.handleLogout();
          setTimeout(() => {
            this.props.handleClick("AfterAuth");
          }, 500);
        }
      })
      .catch((err: Error) => console.log(err));
  }

  render() {
    return (
      <div className="status">
        {!this.props.isSignedIn ? (
          <div className="btn-wrapper">
            <button className="btn-user" type="button" onClick={() => this.props.handleClick("Login")}>
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
            <button className="btn-user" type="button" onClick={() => this.props.handleClick("Register")}>
              <i className="btn-icon fa fa-user" />
              <span>회원가입</span>
            </button>
          </div>
        ) : (
          <div className="btn-wrapper">
            <button className="btn-user" type="button" onClick={() => this.props.handleClick("Edit")}>
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
