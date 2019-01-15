import "./Main.css";

import React from "react";

import Home from "./Home/Home";
import LoginForm from "./Login/LoginForm";
import EditForm from "./EditAccount/EditForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import RegisterTerms from "./RegisterTerms/RegisterTerms";
import Rental from "./Rental/Rental";
import SuperAdmin from "./SuperAdmin/SuperAdmin";
import { NotFound } from "./NotFound/NotFound";
import { EstimateForm } from "./EstimateForm/EstimateForm";
import { EstimateList } from "./EstimateList/EstimateList";
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
