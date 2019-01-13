/**
 * 1주차 다해 - 레이아웃 메인 컴포넌트. 주로 이 컴포넌트의 내용이 업데이트되며 렌더링 됨.
 */

import "./Main.css";

import React, { Component } from "react";

import Home from "./Home/Home";
import LoginForm from "./Login/LoginForm";
import EditForm from "./EditAccount/EditForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import RegisterTerms from "./RegisterTerms/RegisterTerms";
import Rental from "./Rental/Rental";
import { IHandlePage, IHandleEditUserInfomationBtnClick, IEditUserInfomation } from "../../App";
import SuperUser from "./SuperUser/SuperUser";
import EditUserInfomation from "./EditUserInfomation/EditUserInfomation";
import EstimateList from "./EstimateList/EstimateList";

interface IMainProps {
  editUserInfomation: IEditUserInfomation;

  handlePage: IHandlePage;
  handleEditUserInfomationBtnClick: IHandleEditUserInfomationBtnClick;
}

export default class Main extends Component<IMainProps> {
  constructor(props: IMainProps) {
    super(props);
  }

  // url 주소창의 endpoint에 따른 화면 전환
  render() {
    const pathname = location.pathname;
    const handlePage = this.props.handlePage;

    switch (pathname) {
      case "/":
        return <Home />;
      case "/login":
        return <LoginForm handlePage={handlePage} />;
      case "/terms":
        return <RegisterTerms handlePage={handlePage} />;
      case "/register":
        return <RegisterForm handlePage={handlePage} />;
      case "/edit_account":
        return <EditForm handlePage={handlePage} />;
      case "/rental":
        return <Rental />;
      case "/admin/user_information_management":
        return (
          <SuperUser
            handlePage={handlePage}
            handleEditUserInfomationBtnClick={this.props.handleEditUserInfomationBtnClick}
          />
        );
      case "/admin/edit_user_infomation":
        return <EditUserInfomation handlePage={handlePage} editUserInfomation={this.props.editUserInfomation} />;
      case "/estimate_list":
        return <EstimateList />;
      default:
        return <Home />;
    }
  }
}
