import * as React from "react";
import axios from "axios";
import logo from "../../../../assets/img/logo_basic.png";
import "./LoginForm.css";

interface ILoginProps {
  handleLogin: (result: boolean) => void;
  handleClick: (comp: string) => void;
}

interface ILoginState {
  userid: string;
  password: string;
  loading: boolean;
  error: string;
  [key: string]: string | boolean;
}

class LoginForm extends React.Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props);

    this.state = {
      userid: "",
      password: "",
      loading: false,
      error: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e: React.FormEvent<HTMLInputElement>) {
    const { id, value } = e.currentTarget;
    this.setState({ [id]: value });
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const id: string = this.state.userid;
    const pw: string = this.state.password;

    this.setState({ loading: true });

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/login`, { id, pw })
      .then(res => {
        this.props.handleLogin(true);
        localStorage.setItem("x-access-token", res.headers["x-access-token"]);

        setTimeout(() => {
          this.props.handleClick("AfterAuth");
        }, 500);
      })
      .catch((err: Error) => {
        alert("아이디 또는 패스워드가 일치하지 않습니다.");
        this.setState({ loading: false, error: err.message });
      });
  }

  render() {
    const { userid, password, loading, error } = this.state;

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
              <label htmlFor="userid">USERNAME</label>
              <input
                type="text"
                name="u_id"
                id="userid"
                placeholder="회원아이디"
                required
                value={userid}
                onChange={this.handleChange}
              />
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                name="u_password"
                id="password"
                placeholder="비밀번호"
                required
                value={password}
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
