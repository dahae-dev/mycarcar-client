import * as React from "react";
import logo from "../../../../assets/img/logo_basic.png";
import "./LoginForm.css";

interface ILoginState {
  username: string;
  password: string;
  submitted: boolean;
  loading: boolean;
  error: string;
  [key: string]: string | boolean;
}

class Login extends React.Component<{}, ILoginState> {
  constructor(props: any) {
    super(props);

    this.state = {
      username: "",
      password: "",
      submitted: false,
      loading: false,
      error: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e: React.FormEvent<HTMLInputElement>) {
    const { id, value } = e.currentTarget;
    this.setState({ [id]: value });
    console.log(e.currentTarget.value);
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;

    if (!(username && password)) {
      return;
    }

    this.setState({ loading: true });
    // login handling
  }

  render() {
    const { username, password, submitted, loading, error } = this.state;

    return (
      <div className="login-form-container">
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
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              name="u_id"
              id="username"
              placeholder="회원아이디"
              required
              value={username}
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
    );
  }
}

export default Login;
