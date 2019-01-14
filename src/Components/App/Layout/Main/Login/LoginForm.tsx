import "./LoginForm.css";

import React, { Component, FormEvent } from "react";
import axios from "axios";

import logo from "assets/img/logo_basic.png";
import loader from "assets/preloader/Spinner.gif";
import { IHandlePage } from "../../../App";

interface ILoginFormProps {
  handlePage: IHandlePage;
}

interface ILoginFormState {
  id: string;
  pw: string;
  loading: boolean;
  error: string;
  [key: string]: string | boolean;
}

export default class LoginForm extends Component<ILoginFormProps, ILoginFormState> {
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

  handleChange(e: FormEvent<HTMLInputElement>) {
    const { id, value } = e.currentTarget;
    this.setState({ [id]: value });
  }

  handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { id, pw } = this.state;

    this.setState({ loading: true });

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/login`, { id, pw })
      .then((res) => {
        localStorage.setItem("x-access-token", res.headers["x-access-token"]);
        localStorage.setItem("isSignedIn", JSON.stringify(true));
        localStorage.setItem("signedInLevel", JSON.stringify(res.data.level));

        setTimeout(() => {
          this.props.handlePage("/");
        }, 500);
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: "아이디 또는 패스워드가 일치하지 않습니다."
        });
      });
  }

  render() {
    const { id, pw, loading, error } = this.state;
    const isSidebarOpen = JSON.parse(localStorage.getItem("isSidebarOpen") || "true");

    if (loading) {
      return (
        <div id="my-main" className={isSidebarOpen ? "" : "my-main-margin-left"}>
          <div className="login-form-container">
            <img className="pre-loader" src={loader} />
          </div>
        </div>
      );
    }

    return (
      <div id="my-main" className={isSidebarOpen ? "" : "my-main-margin-left"}>
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
