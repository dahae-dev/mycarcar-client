import "./Status.css";

import React from "react";

import LoginButtons from "./LoginButtons/LoginButtons";
import RegisterButtons from "./RegisterButtons/RegisterButtons";
import { IHandlePage } from "../../../App";
import parseJwt, { INVALID_JWT } from "../../../../../util/Auth/parseJwt";

interface IStatusProps {
  handlePage: IHandlePage;
  handleSidebar: () => void;
}

const Status = (props: IStatusProps) => {
  const userToken = localStorage.getItem("x-access-token") || "";
  const decodedToken = userToken === "" ? INVALID_JWT : parseJwt(userToken);
  const level = decodedToken.level;

  if (level) {
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
