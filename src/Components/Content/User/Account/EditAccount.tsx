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

  handleChange(e: React.FormEvent<HTMLInputElement>) {
    const { id, value } = e.currentTarget;
    this.setState({ [id]: value });
    console.log(e.currentTarget.value);
  }

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
