import * as React from "react";
import logo from "../../../../assets/img/logo_basic.png";
import "./RegisterForm.css";

interface IRegisterState {
  userid: "";
  password: "";
  pwdcheck: "";
  name: "";
  email: "";
  phone: "";
  submitted: boolean;
  loading: boolean;
  error: "";
  [key: string]: string | boolean;
}

class RegisterForm extends React.Component<{}, IRegisterState> {
  constructor(props: any) {
    super(props);

    this.state = {
      userid: "",
      password: "",
      pwdcheck: "",
      name: "",
      email: "",
      phone: "",
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

    this.setState({
      submitted: true,
      loading: true
    });

    // register handling
  }

  render() {
    const { userid, password, pwdcheck, name, email, phone, submitted, loading, error } = this.state;
    return (
      <div className="register-form-container">
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
            <label htmlFor="userid">아이디</label>
            <input
              type="text"
              name="u_id"
              id="userid"
              placeholder="아이디"
              required
              value={userid}
              onChange={this.handleChange}
            />
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              name="u_password"
              id="password"
              placeholder="비밀번호"
              required
              value={password}
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
              type="text"
              name="u_email"
              id="email"
              placeholder="이메일"
              required
              value={email}
              onChange={this.handleChange}
            />
            <label id="phone">휴대폰번호</label>
            <input
              type="text"
              name="u_phone"
              id="phone"
              placeholder="휴대폰번호"
              required
              value={phone}
              onChange={this.handleChange}
            />
            <input type="submit" id="btn-register" value="SIGN UP" />
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
