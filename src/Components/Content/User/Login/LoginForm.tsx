import * as React from "react";
import axios from "axios";
import logo from "../../../../assets/img/logo_basic.png";
import "./LoginForm.css";

interface ILoginProps {
  handleLogin: (result: boolean) => void;
  handleState: (changedState: string) => void;
}

interface ILoginState {
  id: string;
  pw: string;
  loading: boolean;
  error: string;
  [key: string]: string | boolean;
}

class LoginForm extends React.Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
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

  /**
   * 사용자 입력값 받아오기
   */
  handleChange(e: React.FormEvent<HTMLInputElement>) {
    const { id, value } = e.currentTarget;
    this.setState({ [id]: value });
  }

  /**
   * 사용자의 입력값과 함께 서버에 HTTP post request로 인증 요청
   * 서버로부터 응답받은 JWT 토큰을 localStorage에 저장 후 페이지 이동
   */
  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { id, pw } = this.state;

    this.setState({ loading: true });

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/login`, { id, pw })
      .then(res => {
        this.props.handleLogin(true);
        localStorage.setItem("x-access-token", res.headers["x-access-token"]);

        setTimeout(() => {
          this.props.handleState("AfterAuth");
        }, 500);
      })
      .catch((err: Error) => {
        alert("아이디 또는 패스워드가 일치하지 않습니다.");
        this.setState({ loading: false, error: err.message });
      });
  }

  render() {
    const { id, pw, loading, error } = this.state;

    return (
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
            <form className="login-form-input" method="post" onSubmit={this.handleSubmit}>
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
              <label htmlFor="pw">pw</label>
              <input
                type="password"
                name="u_pw"
                id="pw"
                placeholder="비밀번호"
                required
                value={pw}
                onChange={this.handleChange}
              />
              <input type="submit" id="btn-login" value="SIGN IN" disabled={loading} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
