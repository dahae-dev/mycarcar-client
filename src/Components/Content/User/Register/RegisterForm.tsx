import * as React from "react";
import axios from "axios";
import logo from "../../../../assets/img/logo_basic.png";
import "./RegisterForm.css";

interface IRegisterProps {
  handleClick: (comp: string) => void;
}

interface IRegisterState {
  userid: string;
  password: string;
  pwdcheck: string;
  name: string;
  email: string;
  phone: string;
  loading: boolean;
  error: string;
  [key: string]: string | boolean;
}

class RegisterForm extends React.Component<IRegisterProps, IRegisterState> {
  constructor(props: IRegisterProps) {
    super(props);

    this.state = {
      userid: "",
      password: "",
      pwdcheck: "",
      name: "",
      email: "",
      phone: "",
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

    const id = this.state.userid;
    const pw = this.state.password;
    const pwdcheck = this.state.pwdcheck;
    const name = this.state.name;
    const email = this.state.email;
    const phone = this.state.phone;

    if (pw !== pwdcheck) {
      alert("재입력한 비밀번호가 일치하지 않습니다.");
      return;
    }

    this.setState({ loading: true });

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/register`, { id, pw, name, email, phone })
      .then(res => {
        alert("회원가입이 정상적으로 처리되었습니다. 로그인 후 사용 가능합니다.");
        setTimeout(() => {
          this.props.handleClick("Login");
        }, 1000);
      })
      .catch((err: Error) => {
        alert("이미 가입된 회원입니다.");
        this.setState({ loading: false, error: err.message });
      });
  }

  render() {
    const { userid, password, pwdcheck, name, email, phone, loading, error } = this.state;
    return (
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
              <input type="submit" id="btn-register" value="SIGN UP" disabled={loading} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
