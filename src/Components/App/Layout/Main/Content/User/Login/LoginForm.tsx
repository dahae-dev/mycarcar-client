/**
 * 로그인 입력양식 컴포넌트
 */

import * as React from "react";
import axios from "axios";
import { ILoginFormProps, ILoginFormState } from "./ILoginForm";
import logo from "../assets/img/logo_basic.png";
import loader from "../assets/preloader/Spinner.gif";
import "./LoginForm.css";

export default class LoginForm extends React.Component<ILoginFormProps, ILoginFormState> {
  constructor(props: ILoginFormProps) {
    super(props);

    this.state = {
      id: "",
      pw: "",
      loading: false,
      error: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // 사용자 입력값 받아와 state에 저장
  handleChange(e: React.FormEvent<HTMLInputElement>) {
    const { id, value } = e.currentTarget;
    this.setState({ [id]: value });
  }

  // 사용자로부터 입력받은 값으로 로그인 처리
  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { id, pw } = this.state;

    this.setState({ loading: true });

    // 서버에 HTTP post request로 인증 요청
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/login`, { id, pw })
      .then(res => {
        // 인증된 경우, 서버로부터 응답받은 JWT 토큰을 localStorage에 저장 후
        this.props.handleAuth(true);
        localStorage.setItem("x-access-token", res.headers["x-access-token"]);

        // 홈 화면으로 페이지 이동
        setTimeout(() => {
          history.pushState(null, "", "/");
          this.props.app.forceUpdate();
        }, 500);
      })
      .catch((err: Error) => {
        // DB 상의 데이터와 일치하지 않는 경우, 에러 처리
        this.setState({
          loading: false,
          error: "아이디 또는 패스워드가 일치하지 않습니다."
        });
      });
  }

  render() {
    const { mainToggle } = this.props;
    const { id, pw, loading, error } = this.state;

    if (loading) {
      return (
        <div className={`my-main ${mainToggle}`}>
          <div className="login-form-container">
            <img className="pre-loader" src={loader} />
          </div>
        </div>
      );
    }
    return (
      <div className={`my-main ${mainToggle}`}>
        <div className="login-form-container">
          <div>
            <div className="login-logo">
              <img src={logo} />
            </div>
            <div className="login-form-box">
              <div className="login-title">
                <i className="fa fa-sign-in" />
                로그인
              </div>
              <hr />
              <form
                className="login-form-input"
                method="post"
                onSubmit={this.handleSubmit}
              >
                <label htmlFor="id">USERNAME</label>
                <input
                  type="text"
                  name="u_id"
                  id="id"
                  placeholder="회원아이디"
                  required
                  value={id}
                  onChange={this.handleChange}
                />
                <label htmlFor="pw">PASSWORD</label>
                <input
                  type="password"
                  name="u_pw"
                  id="pw"
                  placeholder="비밀번호"
                  required
                  value={pw}
                  onChange={this.handleChange}
                />
                <div className="login-error-msg">{error}</div>
                <input type="submit" id="btn-login" value="SIGN IN" disabled={loading} />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
