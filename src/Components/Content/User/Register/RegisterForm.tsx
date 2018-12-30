import * as React from "react";
import axios from "axios";
import logo from "../../../../assets/img/logo_basic.png";
import loader from "../../../../assets/preloader/Spinner.gif";
import "./RegisterForm.css";

interface IRegisterProps {
  handleState: (changedState: string) => void;
}

interface IRegisterState {
  id: string;
  pw: string;
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
      id: "",
      pw: "",
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

  /**
   * 사용자 입력값 받아오기
   */
  handleChange(e: React.FormEvent<HTMLInputElement>) {
    const { id, value } = e.currentTarget;
    this.setState({ [id]: value });
  }

  /**
   * 사용자로부터 입력받은 값으로 비밀번호 일치 여부 우선 확인
   * 서버에 HTTP post request 요청하여 회원가입 처리 후, 로그인 페이지로 이동
   * 이미 가입된 회원의 경우 에러 처리
   */
  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { id, pw, pwdcheck, name, email, phone } = this.state;

    if (pw !== pwdcheck) {
      this.setState({ error: "재입력한 비밀번호가 일치하지 않습니다." });
      return;
    }

    this.setState({ loading: true });

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/register`, { id, pw, name, email, phone })
      .then(res => {
        alert("회원가입이 정상적으로 처리되었습니다. 로그인 후 사용 가능합니다.");
        setTimeout(() => {
          this.props.handleState("Login");
        }, 1000);
      })
      .catch((err: Error) => {
        this.setState({ loading: false, error: "이미 가입된 회원입니다." });
      });
  }

  render() {
    const { id, pw, pwdcheck, name, email, phone, loading, error } = this.state;

    return (
      <div className="register-form-container">
        {loading ? (
          <img className="pre-loader" src={loader} />
        ) : (
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
                <div className="register-error-msg">{error}</div>
                <input type="submit" id="btn-register" value="SIGN UP" disabled={loading} />
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default RegisterForm;
