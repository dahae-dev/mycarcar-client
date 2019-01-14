import "./Status.css";

import React from "react";

import LoginButtons from "./LoginButtons/LoginButtons";
import RegisterButtons from "./RegisterButtons/RegisterButtons";
import { IHandlePage } from "../../../App";

interface IStatusProps {
  handlePage: IHandlePage;
  handleSidebar: () => void;
}

const Status = (props: IStatusProps) => {
  const isSignedIn = localStorage.getItem("isSignedIn");
  if (isSignedIn) {
    return (
      <div className="status">
        <LoginButtons title="로그아웃" handlePage={props.handlePage} handleSidebar={props.handleSidebar} />
        <RegisterButtons title="정보수정" handlePage={props.handlePage} handleSidebar={props.handleSidebar} />
      </div>
    );
  }

  return (
    <div className="status">
      <LoginButtons title="로그인" handlePage={props.handlePage} handleSidebar={props.handleSidebar} />
      <RegisterButtons title="회원가입" handlePage={props.handlePage} handleSidebar={props.handleSidebar} />
    </div>
  );
};

export default Status;
