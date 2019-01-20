import "./SuperAdmin.css";

import React, { Component, MouseEvent, ChangeEvent } from "react";
import loader from "assets/preloader/Spinner.gif";
import { IHandlePage } from "../../../App";
import { MainHeader } from "../MainHeader/MainHeader";
import { RequestHandler, IConfig } from "../../../../../util/RequestHandler";

interface ISuperAdminProps {
  handlePage: IHandlePage;
}

interface IUserList {
  id: string;
  name: string;
  email: string;
  phone: string;
  level: number;
  company: string;
  fax: string;
  registerDate: string;
  [key: string]: string | number;
}

interface ISuperAdminStates {
  userList: IUserList[];
  totalCount: number;
  pageCount: number;
  loading: boolean;
  error: string;
}

interface ITotalCountData {
  totalCount: number;
}

interface IUserListData {
  userList: IUserList[];
}

export default class SuperAdmin extends Component<ISuperAdminProps, ISuperAdminStates> {
  constructor(props: ISuperAdminProps) {
    super(props);

    this.state = {
      userList: [
        {
          id: "정보없음",
          name: "정보없음",
          email: "정보없음@codestates.com",
          phone: "000-0000-0000",
          level: 0,
          company: "정보없음",
          fax: "000-000-0000",
          registerDate: "정보없음"
        }
      ],

      totalCount: 1,
      pageCount: 1,

      loading: false,
      error: ""
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });

    const requestHandler = new RequestHandler();
    let uri = `${process.env.REACT_APP_API_URL}/api/admin/user-list`;
    const config: IConfig = {
      headers: { "x-access-token": localStorage.getItem("x-access-token") || "" }
    };
    const totalCountResult = await requestHandler.get(uri, config);

    const totalCount = totalCountResult.data.totalCount;
    const pageCount = Math.ceil(totalCount / 10);

    uri = `${process.env.REACT_APP_API_URL}/api/admin/user-list/1`;
    const result = await requestHandler.get(uri, config);

    this.setState({
      userList: result.data.userList,
      totalCount,
      pageCount,
      loading: false,
      error: result.error
    });
  }

  handlePagination = async (e: MouseEvent<HTMLDivElement>) => {
    const page = e.currentTarget.textContent || "-1";

    const requestHandler = new RequestHandler();
    const uri = `${process.env.REACT_APP_API_URL}/api/admin/user-list/${page}`;
    const config: IConfig = {
      headers: { "x-access-token": localStorage.getItem("x-access-token") || "" }
    };
    const result = await requestHandler.get(uri, config);

    this.setState({ userList: result.data.userList });
  };

  handleLevelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    const index = parseInt(e.currentTarget.dataset.index || "-1", 10);

    this.setState({
      userList: this.state.userList.map((user, i) => (i === index ? Object.assign({}, user, { level: value }) : user))
    });
  };

  handleEditClick = async (e: MouseEvent<HTMLDivElement>) => {
    const index = parseInt(e.currentTarget.dataset.index || "-1", 10);

    const requestHandler = new RequestHandler();
    const uri = `${process.env.REACT_APP_API_URL}/api/admin/user-list/update`;
    const body = this.state.userList[index];
    const config: IConfig = {
      headers: { "x-access-token": localStorage.getItem("x-access-token") || "" }
    };
    const result = await requestHandler.patch(uri, body, config);

    if (result.error === "") {
      alert("회원정보가 정상적으로 수정되었습니다.");
    }

    this.setState({ error: result.error });
  };

  render() {
    const isSidebarOpen = JSON.parse(localStorage.getItem("isSidebarOpen") || "true");
    const { userList, loading, error } = this.state;

    if (loading) {
      return (
        <div id="my-main" className={isSidebarOpen ? "" : "my-main-margin-left"}>
          <div className="super-admin-loader-container">
            <img className="pre-loader" src={loader} />
          </div>
        </div>
      );
    }

    return (
      <div id="my-main" className={isSidebarOpen ? "" : "my-main-margin-left"}>
        <MainHeader title="회원정보관리" icon="television" />
        <div className="super-admin-container">
          <div className="super-admin-list">
            <div className="super-admin-list-head">
              <div className="super-admin-list-element">아이디</div>
              <div className="super-admin-list-element">이름</div>
              <div className="super-admin-list-element">이메일</div>
              <div className="super-admin-list-element">휴대폰</div>
              <div className="super-admin-list-element">회사</div>
              <div className="super-admin-list-element">팩스</div>
              <div className="super-admin-list-element">등급</div>
              <div className="super-admin-list-element">가입일</div>
              <div className="super-admin-list-element">수정</div>
            </div>

            {error ? <div className="list-error-msg">{error}</div> : <div />}

            {userList.map((member, idx) => (
              <div className="super-admin-list-content" key={member.id}>
                <div className="super-admin-list-element">{member.id}</div>
                <div className="super-admin-list-element">{member.name}</div>
                <div className="super-admin-list-element">{member.email}</div>
                <div className="super-admin-list-element">{member.phone}</div>
                <div className="super-admin-list-element">{member.company}</div>
                <div className="super-admin-list-element">{member.fax}</div>
                <div className="super-admin-list-element">
                  <select value={member.level} data-index={idx} onChange={this.handleLevelChange} required>
                    <option value="1">1</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                  </select>
                </div>
                <div className="super-admin-list-element">{member.registerDate.slice(0, 10)}</div>
                <div className="super-admin-list-element">
                  <input type="button" onClick={this.handleEditClick} data-index={idx} value="수정" />
                </div>
              </div>
            ))}
          </div>

          <div className="super-admin-pagination">
            <div>
              <i className="fa fa-angle-double-left" />
            </div>
            <div>
              {Array(this.state.pageCount)
                .fill(1)
                .map((v, i) => (
                  <div key={i} data-page={i + 1} onClick={this.handlePagination}>
                    {i + 1}
                  </div>
                ))}
            </div>
            <div>
              <i className="fa fa-angle-double-right" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
