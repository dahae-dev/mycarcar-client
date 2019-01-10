import "./EditUserInfomation.css";

import React, { Component, FormEvent } from "react";

import axios from "axios";
import { IEditUserInfomation, IHandlePage } from "../../../App";

interface IEditUserInfomationProps {
  editUserInfomation: IEditUserInfomation;
  isSidebarOpen: boolean;

  handlePage: IHandlePage;
}

interface IEditUserInfomationStates {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  fax: string;
  level: string;
  [key: string]: string;
}

export default class EditUserInfomation extends Component<IEditUserInfomationProps, IEditUserInfomationStates> {
  constructor(props: IEditUserInfomationProps) {
    super(props);

    this.state = {
      id: "",
      name: "",
      email: "",
      phone: "",
      company: "",
      fax: "",
      level: "",
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      id: this.props.editUserInfomation.id,
      name: this.props.editUserInfomation.name,
      email: this.props.editUserInfomation.email,
      phone: this.props.editUserInfomation.phone,
      company: this.props.editUserInfomation.company,
      fax: this.props.editUserInfomation.fax,
      level: this.props.editUserInfomation.level.toString(),
    });
  }

  handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const axiosOption = {
      headers: { "x-access-token": localStorage.getItem("x-access-token") },
    };

    const axiosData = this.state;
    axios
      .patch(`${process.env.REACT_APP_API_URL}/api/admin/user-list/update`, axiosData, axiosOption)
      .then(res => {
        alert("수정되었습니다.");
        this.props.handlePage("/admin/user_information_management");
      })
      .catch((err: Error) => console.error(err.message));
  }

  handleChange(e: FormEvent<HTMLInputElement>) {
    const { id, value } = e.currentTarget;
    this.setState({ [id]: value });
  }

  render() {
    return (
      <div id="my-main">
        <div className="edit_user_infomation">
          <div>
            <form className="edit_user_info_form" onSubmit={this.handleOnSubmit}>
              <div className="edit_user_info">
                <div>아이디</div>
                <input type="text" id="id" onChange={this.handleChange} value={this.state.id} disabled />
              </div>
              <div className="edit_user_info">
                <div>이름</div>
                <input type="text" id="email" onChange={this.handleChange} value={this.state.name} />
              </div>
              <div className="edit_user_info">
                <div>이메일</div>
                <input type="text" id="phone" onChange={this.handleChange} value={this.state.email} />
              </div>
              <div className="edit_user_info">
                <div>핸드폰</div>
                <input type="text" id="phone" onChange={this.handleChange} value={this.state.phone} />
              </div>
              <div className="edit_user_info">
                <div>회사명</div>
                <input type="text" id="company" onChange={this.handleChange} value={this.state.company} />
              </div>
              <div className="edit_user_info">
                <div>팩스번호</div>
                <input type="text" id="fax" onChange={this.handleChange} value={this.state.fax} />
              </div>
              <div className="edit_user_info">
                <div>회원 등급</div>
                <input type="text" id="level" onChange={this.handleChange} value={this.state.level} />
              </div>
              <input type="submit" value="수정" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
