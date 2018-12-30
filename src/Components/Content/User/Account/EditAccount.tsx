import * as React from "react";
import axios from "axios";
import logo from "../../../../assets/img/logo_basic.png";
import "./EditAccount.css";

interface IAccountProps {
  handleState: (changedState: string) => void;
  handleLogout: () => void;
}

interface IAccountState {
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

class EditForm extends React.Component<IAccountProps, IAccountState> {
  constructor(props: IAccountProps) {
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
   * 컴포넌트가 마운트된 직후 서버에 HTTP get request 요청
   * localStorage에 저장된 JWT 토큰을 헤더에 실어 전달
   * 인증된 사용자의 회원 정보를 모두 받아와 입력양식에 뿌려주기
   */
  componentDidMount() {
    const config: object = {
      headers: { "x-access-token": localStorage.getItem("x-access-token") }
    };

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/edit_account`, config)
      .then(res => {
        const data = res.data;
        this.setState({ ...data });
      })
      .catch((err: Error) => {
        alert("재로그인 한 후 사용 가능합니다.");
        this.props.handleLogout();
        localStorage.removeItem("x-access-token");
        this.props.handleState("AfterAuth");
        this.setState({ error: err.message });
      });
  }

  /**
   * 사용자가 수정한 입력값 받아오기
   */
  handleChange(e: React.FormEvent<HTMLInputElement>) {
    const { id, value } = e.currentTarget;
    this.setState({ [id]: value });
    console.log(e.currentTarget.value);
  }

  /**
   * 사용자가 수정한 값과 함께 서버에 HTTP post request 요청
   * 회원정보 수정 처리에 대한 응답을 받으면 페이지 이동
   */
  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { id, pw, pwdcheck, name, email, phone } = this.state;

    if (pw !== pwdcheck) {
      alert("재입력한 비밀번호가 일치하지 않습니다.");
      return;
    }

    this.setState({ loading: true });

    const config: object = {
      headers: { "x-access-token": localStorage.getItem("x-access-token") }
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/edit_account`, { id, pw, name, email, phone }, config)
      .then(res => {
        alert("회원정보가 정상적으로 수정되었습니다.");
        this.props.handleState("AfterEdit");
      })
      .catch((err: Error) => {
        this.setState({ loading: false, error: err.message });
      });
  }

  render() {
    const { id, pw, pwdcheck, name, email, phone, loading, error } = this.state;

    return (
      <div className="edit-form-container">
        <div className="edit-logo">
          <img src={logo} />
        </div>
        <div className="edit-form-box">
          <div className="edit-title">
            <i className="fa fa-user" />
            회원정보수정
          </div>
          <hr />
          <form className="edit-form-input" method="post" onSubmit={this.handleSubmit}>
            <label htmlFor="id">아이디</label>
            <input type="text" name="u_id" id="id" required value={id} onChange={this.handleChange} />
            <label htmlFor="pw">비밀번호</label>
            <input type="password" name="u_password" id="pw" required value={pw} onChange={this.handleChange} />
            <label htmlFor="pwdcheck">비밀번호 확인</label>
            <input type="password" id="pwdcheck" required value={pwdcheck} onChange={this.handleChange} />
            <label htmlFor="name">이름</label>
            <input type="text" name="u_name" id="name" required value={name} onChange={this.handleChange} />
            <label htmlFor="email">이메일</label>
            <input type="email" name="u_email" id="email" required value={email} onChange={this.handleChange} />
            <label id="phone">휴대폰번호</label>
            <input type="tel" name="u_phone" id="phone" required value={phone} onChange={this.handleChange} />
            <input type="submit" id="btn-edit" value="EDIT" disabled={loading} />
          </form>
        </div>
      </div>
    );
  }
}

export default EditForm;
