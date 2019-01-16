import "./EditForm.css";

import React, { Component, FormEvent } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";

import logo from "assets/img/logo_basic.png";
import loader from "assets/preloader/Spinner.gif";
import { IHandlePage } from "../../../App";

interface IEditFormProps {
  handlePage: IHandlePage;
}

interface IEditFormState {
  userData: IUserData;
  loading: boolean;
  error: string;
  [key: string]: string | boolean | IUserData;
}

interface IPatchEdit {
  (endpoint: string, data: object): void;
}

interface IUserData {
  company: string;
  id: string;
  pw: string;
  pwdcheck: string;
  name: string;
  email: string;
  phone: string;
  fax: string;
}

const INITIAL_USER_DATA = {
  company: "",
  id: "",
  pw: "",
  pwdcheck: "",
  name: "",
  email: "",
  phone: "",
  fax: ""
};

export default class EditForm extends Component<IEditFormProps, IEditFormState> {
  constructor(props: IEditFormProps) {
    super(props);

    this.state = {
      userData: INITIAL_USER_DATA,
      loading: false,
      error: ""
    };
  }

  async componentDidMount() {
    const config = {
      headers: { "x-access-token": localStorage.getItem("x-access-token") }
    };

    this.setState({ loading: true });

    const userDataResult = await axios
      .get(`${process.env.REACT_APP_API_URL}/api/edit_account`, config)
      .then((res: AxiosResponse<IUserData>) => ({
        userData: res.data,
        loading: false,
        error: ""
      }))
      .catch((error: AxiosError) => {
        localStorage.removeItem("isSignedIn");
        localStorage.removeItem("x-access-token");
        alert("재로그인 한 후 사용 가능합니다.");
        return {
          userData: INITIAL_USER_DATA,
          loading: true,
          error: (error.response as AxiosResponse).statusText
        };
      });

    if (userDataResult.error !== "") {
      this.props.handlePage("/user/login");
    }

    this.setState({ userData: userDataResult.userData, loading: userDataResult.loading, error: userDataResult.error });
  }

  handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    this.setState({ ...this.state, userData: { ...this.state.userData, [id]: value } });
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { company, id, pw, pwdcheck, name, email, phone, fax } = this.state.userData;

    if (pw !== pwdcheck) {
      return this.setState({ error: "재입력한 비밀번호가 일치하지 않습니다." });
    }

    this.setState({ loading: true });

    const config = {
      headers: { "x-access-token": localStorage.getItem("x-access-token") }
    };

    const patchEdit: IPatchEdit = async (endpoint, data) => {
      const result = await axios
        .patch(`${process.env.REACT_APP_API_URL}/api/edit_account/${endpoint}`, data, config)
        .then(() => {
          alert("회원정보가 정상적으로 수정되었습니다.");
          return {
            loading: false,
            error: ""
          };
        })
        .catch((error: AxiosError) => ({
          loading: false,
          error: (error.response as AxiosResponse).statusText
        }));

      if (result.error === "") {
        this.props.handlePage("/");
      }

      this.setState({ loading: result.loading, error: result.error });
    };

    if (this.state.company === null) {
      patchEdit(`user`, { id, pw, name, email, phone });
    }

    if (this.state.company !== null) {
      patchEdit(`company`, { company, id, pw, name, email, phone, fax });
    }
  };

  render() {
    const { company, id, pw, pwdcheck, name, email, phone, fax } = this.state.userData;
    const { loading, error } = this.state;
    const isSidebarOpen = JSON.parse(localStorage.getItem("isSidebarOpen") || "true");

    if (loading) {
      return (
        <div id="my-main" className={isSidebarOpen ? "" : "my-main-margin-left"}>
          <div className="edit-form-container">
            <img className="pre-loader" src={loader} />
          </div>
        </div>
      );
    }

    return (
      <div id="my-main" className={isSidebarOpen ? "" : "my-main-margin-left"}>
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
