import * as React from "react";
import axios from "axios";
import logo from "../../../../assets/img/logo_basic.png";
import "./EditAccount.css";

interface IAccountProps {
  handleClick: (comp: string) => void;
}

interface IAccountState {
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

const config: object = {
  headers: { "x-access-token": localStorage.getItem("x-access-token") }
};

class EditForm extends React.Component<IAccountProps, IAccountState> {
  constructor(props: IAccountProps) {
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

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/edit_account`, config)
      .then(res => {
        const data = res.data;
        this.setState({ data });
      })
      .catch((err: Error) => this.setState({ error: err.message }));
  }

  handleChange(e: React.FormEvent<HTMLInputElement>) {
    const { id, value } = e.currentTarget;
    this.setState({ [id]: value });
    console.log(e.currentTarget.value);
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
      .post(`${process.env.REACT_APP_API_URL}/api/edit_account`, { id, pw, name, email, phone }, config)
      .then(res => {
        console.log("res.data: ", res.data);
        if (res.data.isEditted) {
          alert("회원정보가 정상적으로 수정되었습니다.");
          this.props.handleClick("AfterEdit");
        } else {
          alert("");
          this.setState({ loading: false });
        }
      })
      .catch((err: Error) => this.setState({ loading: false, error: err.message }));
  }

  render() {
    const { userid, password, pwdcheck, name, email, phone, loading, error } = this.state;

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
            <label htmlFor="userid">아이디</label>
            <input type="text" name="u_id" id="userid" required value={userid} onChange={this.handleChange} />
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              name="u_password"
              id="password"
              required
              value={password}
              onChange={this.handleChange}
            />
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
