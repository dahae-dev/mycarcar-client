import "./RegisterForm.css";

import React, { FormEvent, ChangeEvent } from "react";
import axios from "axios";

import logo from "assets/img/logo_basic.png";
import loader from "assets/preloader/Spinner.gif";
import { IHandlePage } from "../../../App";

interface IRegisterFormProps {
  handlePage: IHandlePage;
}

interface IRegisterFormState {
  checkedValue: string;
  pwdcheck: string;
  id: string;
  pw: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  fax: string;
  loading: boolean;
  error: string;
  [key: string]: string | boolean;
}

interface IPostRegister {
  (endpoint: string, data: object): void;
}

export default class RegisterForm extends React.Component<IRegisterFormProps, IRegisterFormState> {
  constructor(props: IRegisterFormProps) {
    super(props);

    this.state = {
      checkedValue: "개인",
      company: "",
      id: "",
      pw: "",
      pwdcheck: "",
      name: "",
      email: "",
      phone: "",
      fax: "",
      loading: false,
      error: ""
    };
  }

  handleCheck = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    this.setState({ checkedValue: value });
  };

  handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    this.setState({ [id]: value });
  };
  handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    this.setState({ company: value });
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { company, id, pw, pwdcheck, name, email, phone, fax } = this.state;

    if (pw !== pwdcheck) {
      this.setState({ error: "재입력한 비밀번호가 일치하지 않습니다." });
      return;
    }

    this.setState({ loading: true });

    const postRegister: IPostRegister = (endpoint, data) => {
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/register/${endpoint}`, data)
        .then(() => {
          alert("회원가입이 정상적으로 처리되었습니다. 로그인 후 사용 가능합니다.");
          setTimeout(() => {
            this.props.handlePage("/login");
          }, 1000);
        })
        .catch(() => {
          this.setState({ loading: false, error: "이미 가입된 회원입니다." });
        });
    };

    if (this.state.checkedValue === "개인") {
      postRegister(`user`, { id, pw, name, email, phone });
    }

    if (this.state.checkedValue === "협력사") {
      postRegister(`company`, { company, id, pw, name, email, phone, fax });
    }
  };

  render() {
    const { checkedValue, company, id, pw, pwdcheck, name, email, phone, fax, loading, error } = this.state;
    const isSidebarOpen = localStorage.getItem("isSidebarOpen") || "true";

    if (loading) {
      return (
        <div id="my-main" className={isSidebarOpen ? "" : "my-main-margin-left"}>
          <div className="register-form-container">
            <img className="pre-loader" src={loader} />
          </div>
        </div>
      );
    }

    return (
      <div id="my-main" className={isSidebarOpen ? "" : "my-main-margin-left"}>
        <div className="register-form-container">
          <div>
            <div className="register-logo">
              <img src={logo} />
            </div>
            <div className="register-form-box">
              <div className="register-title">
                <i className="fa fa-user" />
                회원가입
              </div>
              <hr />
              <form className="register-form-input" method="post" onSubmit={this.handleSubmit}>
                <div className="register-form-group">
                  <input
                    type="radio"
                    id="user-group"
                    name="group"
                    value="개인"
                    checked={checkedValue === "개인"}
                    onChange={this.handleCheck}
                  />
                  <label htmlFor="user-group">개인</label>
                  <input
                    type="radio"
                    id="company-group"
                    name="group"
                    value="협력사"
                    checked={checkedValue === "협력사"}
                    onChange={this.handleCheck}
                  />
                  <label htmlFor="company-group">협력사</label>
                </div>
                <div id="select-container" className={this.state.checkedValue === "개인" ? "input-hidden" : ""}>
                  <label htmlFor="company">회사명</label>
                  <select id="company" value={company} onChange={this.handleSelect} required>
                    <option value="회사명을 선택하세요" hidden>
                      회사명을 선택하세요
                    </option>
                    <option value="효성캐피탈">효성캐피탈</option>
                    <option value="JB우리캐피탈">JB우리캐피탈</option>
                    <option value="현대캐피탈">현대캐피탈</option>
                    <option value="롯데캐피탈">롯데캐피탈</option>
                    <option value="BNK캐피탈">BNK캐피탈</option>
                    <option value="아주캐피탈">아주캐피탈</option>
                    <option value="농협캐피탈">농협캐피탈</option>
                    <option value="하나캐피탈">하나캐피탈</option>
                    <option value="우리카드">우리카드</option>
                    <option value="신한카드">신한카드</option>
                    <option value="삼성카드">삼성카드</option>
                    <option value="AJ렌터카">AJ렌터카</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
                <label htmlFor="id">아이디</label>
                <input
                  type="text"
                  name="u_id"
                  id="id"
                  placeholder="아이디"
                  required
                  value={id}
                  onChange={this.handleChange}
                />
                <label htmlFor="pw">비밀번호</label>
                <input
                  type="password"
                  name="u_pw"
                  id="pw"
                  placeholder="비밀번호"
                  required
                  value={pw}
                  onChange={this.handleChange}
                />
                <label htmlFor="pwdcheck">비밀번호 확인</label>
                <input
                  type="password"
                  id="pwdcheck"
                  placeholder="비밀번호 확인"
                  required
                  value={pwdcheck}
                  onChange={this.handleChange}
                />
                <label htmlFor="name">이름</label>
                <input
                  type="text"
                  name="u_name"
                  id="name"
                  placeholder="이름"
                  required
                  value={name}
                  onChange={this.handleChange}
                />
                <label htmlFor="email">이메일</label>
                <input
                  type="email"
                  name="u_email"
                  id="email"
                  placeholder="email@email.com"
                  required
                  value={email}
                  onChange={this.handleChange}
                />
                <label id="phone">휴대폰번호</label>
                <input
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                  name="u_phone"
                  id="phone"
                  placeholder="000-0000-0000"
                  required
                  value={phone}
                  onChange={this.handleChange}
                />
                <div id="fax-input-container" className={this.state.checkedValue === "개인" ? "input-hidden" : ""}>
                  <label htmlFor="fax">팩스번호</label>
                  <input
                    type="text"
                    name="u_fax"
                    id="fax"
                    placeholder="팩스번호"
                    value={fax}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="register-error-msg">{error}</div>
                <input type="submit" id="btn-register" value="SIGN UP" disabled={loading} />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
