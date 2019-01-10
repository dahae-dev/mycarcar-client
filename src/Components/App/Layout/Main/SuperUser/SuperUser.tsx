import "./SuperUser.css";

import React, { Component, MouseEvent } from "react";
import { IHandlePage, IHandleEditUserInfomationBtnClick } from "../../../App";

import axios from "axios";

interface ISuperUserProps {
  isSidebarOpen: boolean;
  handlePage: IHandlePage;
  handleEditUserInfomationBtnClick: IHandleEditUserInfomationBtnClick;
}

interface IMemberList {
  id: string;
  name: string;
  email: string;
  phone: string;
  level: number;
  company: string;
  fax: string;
  registerDate: string;
}

interface ISuperUserStates {
  userList: IMemberList[];
  totalCount: number;
  pageCount: number;
}

export default class SuperUser extends Component<ISuperUserProps, ISuperUserStates> {
  constructor(props: ISuperUserProps) {
    super(props);

    this.state = {
      userList: [
        {
          id: "정보없음",
          name: "정보없음",
          email: "정보없음@codestates.com",
          phone: "정보없음",
          level: 0,
          company: "정보없음",
          fax: "000-000-0000",
          registerDate: "정보없음",
        },
      ],

      totalCount: 1,
      pageCount: 1,
    };

    this.handleMemberListNumberClick = this.handleMemberListNumberClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  async componentDidMount() {
    const axiosOption = {
      headers: { "x-access-token": localStorage.getItem("x-access-token") },
    };

    const totalCount = await axios
      .get(`${process.env.REACT_APP_API_URL}/api/admin/user-list`, axiosOption)
      .then(res => {
        return res.data.totalCount;
      })
      .catch((err: Error) => console.error(err.message));

    const pageCount = Math.ceil(totalCount / 10);

    const userList = await axios
      .get(`${process.env.REACT_APP_API_URL}/api/admin/user-list/1`, axiosOption)
      .then(res => {
        return res.data.userList;
      })
      .catch((err: Error) => console.error(err.message));

    this.setState({ totalCount, userList, pageCount });
  }

  async handleMemberListNumberClick(e: MouseEvent) {
    const page = e.currentTarget.textContent || "-1";

    const axiosOption = {
      headers: { "x-access-token": localStorage.getItem("x-access-token") },
    };

    const userList = await axios
      .get(`${process.env.REACT_APP_API_URL}/api/admin/user-list/${page}`, axiosOption)
      .then(res => res.data.userList)
      .catch((err: Error) => console.error(err.message));

    this.setState({ userList });
  }

  handleEditClick(e: MouseEvent) {
    const userListIdx = parseInt(e.currentTarget.getAttribute("data-index") || "-1", 10);
    const editUserInfomation = this.state.userList[userListIdx];

    history.pushState("", "", "/admin/edit_user_infomation");
    this.props.handleEditUserInfomationBtnClick(editUserInfomation);
  }

  render() {
    return (
      <div className="super_user">
        <div>
          <div>
            <div className="mb_list mb_list_title">
              <div className="mb_list_element">아이디</div>
              <div className="mb_list_element">이름</div>
              <div className="mb_list_element">이메일</div>
              <div className="mb_list_element">휴대폰</div>
              <div className="mb_list_element">회사</div>
              <div className="mb_list_element">팩스</div>
              <div className="mb_list_element">등급</div>
              <div className="mb_list_element">가입일</div>
              <div className="mb_list_element">수정</div>
            </div>
          </div>
          <div>
            {this.state.userList.map((member, idx) => (
              <div className="mb_list" key={member.id}>
                <div className="mb_list_element">{member.id}</div>
                <div className="mb_list_element">{member.name}</div>
                <div className="mb_list_element">{member.email}</div>
                <div className="mb_list_element">{member.phone}</div>
                <div className="mb_list_element">{member.company}</div>
                <div className="mb_list_element">{member.fax}</div>
                <div className="mb_list_element">{member.level}</div>
                <div className="mb_list_element">{member.registerDate}</div>
                <div className="mb_list_element mb_edit_btn" onClick={this.handleEditClick} data-index={idx}>
                  수정
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb_list_nav">
          <div>
            <i className="fa fa-angle-double-left" />
          </div>
          <div>
            {Array(this.state.pageCount)
              .fill(1)
              .map((v, i) => (
                <div key={i} data-page={i + 1} onClick={this.handleMemberListNumberClick}>
                  {i + 1}
                </div>
              ))}
          </div>
          <div>
            <i className="fa fa-angle-double-right" />
          </div>
        </div>
      </div>
    );
  }
}
