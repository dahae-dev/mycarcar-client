/**
 * 1주차 다해 - 회원정보수정 양식 컴포넌트
 */

import "./EditForm.css";

import React from "react";
import axios from "axios";

import logo from "assets/img/logo_basic.png";
import loader from "assets/preloader/Spinner.gif";
import { IHandlePage } from "../../../App";

interface IEditFormProps {
  isOpen: boolean;

  handlePage: IHandlePage;
  handleAuth: (result: boolean, id: string, level: number) => void;
}

interface IPostEdit {
  (endpoint: string, data: object): void;
}

interface IEditFormState {
  company: string;
  id: string;
  pw: string;
  pwdcheck: string;
  name: string;
  email: string;
  phone: string;
  fax: string;
  loading: boolean;
  error: string;
  [key: string]: string | boolean;
}

export default class EditForm extends React.Component<IEditFormProps, IEditFormState> {
  constructor(props: IEditFormProps) {
    super(props);

    this.state = {
      company: "",
      id: "",
      pw: "",
      pwdcheck: "",
      name: "",
      email: "",
      phone: "",
      fax: "",
      loading: false,
      error: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // 컴포넌트가 마운트된 직후 서버에 HTTP get request 요청하여 사용자 데이터 받아오기
  componentDidMount() {
    // localStorage에 저장된 JWT 토큰을 헤더에 실어 전달
    const config: object = {
      headers: { "x-access-token": localStorage.getItem("x-access-token") },
    };

    this.setState({ loading: true });

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/edit_account`, config)
      .then(res => {
        // 인증된 사용자의 회원 정보를 모두 받아와 입력양식에 뿌려주기
        const data = res.data;
        this.setState({ ...data, loading: false });
      })
      .catch((err: Error) => {
        // JWT 토큰 기간이 만료된 경우, 에러 처리
        alert("재로그인 한 후 사용 가능합니다.");
        this.props.handleAuth(false, "", 0);
        localStorage.removeItem("x-access-token");
        this.props.handlePage("/login");
      });
  }

  // 사용자가 수정한 입력값 받아와 state에 저장
  handleChange(e: React.FormEvent<HTMLInputElement>) {
    const { id, value } = e.currentTarget;
    this.setState({ [id]: value });
  }

  // 사용자로부터 입력받은 값으로 비밀번호 일치 여부 우선 확인
  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { company, id, pw, pwdcheck, name, email, phone, fax } = this.state;

    if (pw !== pwdcheck) {
      this.setState({ error: "재입력한 비밀번호가 일치하지 않습니다." });
      return;
    }

    this.setState({ loading: true });

    // 인증된 상태에서는 서버에 HTTP request를 할 때마다 헤더에 JWT 토큰을 실어서 함께 보내줘야 함
    const config: object = {
      headers: { "x-access-token": localStorage.getItem("x-access-token") },
    };

    // 사용자가 수정한 값과 함께 서버에 HTTP post request 요청
    const postEdit: IPostEdit = (endpoint, data) => {
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/edit_account/${endpoint}`, data, config)
        .then(res => {
          // 회원정보 수정 처리에 대한 응답을 받으면 페이지 이동
          alert("회원정보가 정상적으로 수정되었습니다.");
          this.props.handlePage("/");
        })
        .catch((err: Error) => {
          this.setState({ loading: false, error: err.message });
        });
    };

    // 일반 회원인 경우 HTTP request 요청
    if (this.state.company === null) {
      postEdit(`user`, { id, pw, name, email, phone });
    }

    // 협력사 회원인 경우 HTTP request 요청
    if (this.state.company !== null) {
      postEdit(`company`, { company, id, pw, name, email, phone, fax });
    }
  }

  render() {
    const { company, id, pw, pwdcheck, name, email, phone, fax, loading, error } = this.state;

    if (loading) {
      return (
        <div id="my-main" className={this.props.isOpen ? "" : "my-main-margin-left"}>
          <div className="edit-form-container">
            <img className="pre-loader" src={loader} />
          </div>
        </div>
      );
    }

    return (
      <div id="my-main" className={this.props.isOpen ? "" : "my-main-margin-left"}>
        <div className="edit-form-container">
          <div>
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
                <div id="company-input-container" className={this.state.company === null ? "input-hidden" : ""}>
                  <label htmlFor="company">회사명</label>
                  <input type="text" name="u_company" id="company" placeholder="회사명" value={company} disabled />
                </div>
                <label htmlFor="id">아이디</label>
                <input type="text" name="u_id" id="id" required value={id} disabled />
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
                <div id="fax-input-container" className={this.state.company === null ? "input-hidden" : ""}>
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
                <div className="edit-error-msg">{error}</div>
                <input type="submit" id="btn-edit" value="EDIT" disabled={loading} />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
