import "./Main.css";

import React from "react";

import Home from "./Home/Home";

import LoginForm from "./UserAccount/Login/LoginForm";
import RegisterTerms from "./UserAccount/RegisterTerms/RegisterTerms";
import RegisterForm from "./UserAccount/RegisterForm/RegisterForm";
import EditForm from "./UserAccount/EditAccount/EditForm";
import Rental from "./Rental/Rental";
import SuperAdmin from "./SuperAdmin/SuperAdmin";
import { EstimateList } from "./Estimate/EstimateList/EstimateList";
import { EstimateForm } from "./Estimate/EstimateForm/EstimateForm";
import { NotFound } from "./NotFound/NotFound";
import { IHandlePage } from "../../App";

interface IMainProps {
  handlePage: IHandlePage;
}

const Main = (props: IMainProps) => {
  const pathname = location.pathname;
  const handlePage = props.handlePage;

  switch (pathname) {
    case "/":
      return <Home />;
    case "/user/login":
      return <LoginForm handlePage={handlePage} />;
    case "/user/terms":
      return <RegisterTerms handlePage={handlePage} />;
    case "/user/register":
      return <RegisterForm handlePage={handlePage} />;
    case "/user/edit":
      return <EditForm handlePage={handlePage} />;
    case "/rental":
      return <Rental />;
    case "/admin/edit":
      return <SuperAdmin handlePage={handlePage} />;
    case "/estimate/list":
      return <EstimateList handlePage={handlePage} />;
    case "/estimate/form":
      return <EstimateForm />;
    default:
      return <NotFound />;
  }
};

export default Main;
