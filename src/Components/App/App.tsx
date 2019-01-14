import "./App.css";

import React, { Component } from "react";

import { Header, SideBar, Main, Footer } from "./Layout";

export interface IHandlePage {
  (pathname: string): void;
}

export interface IEditUserInfomation {
  id: string;
  name: string;
  email: string;
  phone: string;
  level: number;
  company: string;
  fax: string;
  registerDate: string;
}

export interface IHandleEditUserInfomationBtnClick {
  (editUserInfomation: IEditUserInfomation): void;
}

interface IAppState {
  editUserInfomation: IEditUserInfomation;
}

export default class App extends Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      editUserInfomation: {
        id: "",
        name: "",
        email: "",
        phone: "",
        level: -1,
        company: "",
        fax: "",
        registerDate: ""
      }
    };

    this.handleSidebar = this.handleSidebar.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.handleEditUserInfomationBtnClick = this.handleEditUserInfomationBtnClick.bind(this);
  }

  componentDidMount() {
    onpopstate = () => {
      this.forceUpdate();
    };

    addEventListener("resize", () => {
      if (window.innerWidth >= 1280) {
        localStorage.setItem("isSidebarOpen", JSON.stringify(true));
        this.forceUpdate();
      }
      if (window.innerWidth <= 768) {
        localStorage.setItem("isSidebarOpen", JSON.stringify(false));
        this.forceUpdate();
      }
    });
  }

  handleEditUserInfomationBtnClick(editUserInfomation: IEditUserInfomation) {
    this.setState({ editUserInfomation });
  }

  handleSidebar() {
    let isSidebarOpen = JSON.parse(localStorage.getItem("isSidebarOpen") || "true");
    isSidebarOpen = JSON.stringify(!isSidebarOpen);

    localStorage.setItem("isSidebarOpen", isSidebarOpen);
    this.forceUpdate();
  }

  handlePage(pathname: string) {
    history.pushState(null, "", pathname);
    this.forceUpdate();
  }

  render() {
    return (
      <div className="grid-container">
        <Header handlePage={this.handlePage} handleSidebar={this.handleSidebar} />

        <SideBar handlePage={this.handlePage} handleSidebar={this.handleSidebar} />

        <Main
          editUserInfomation={this.state.editUserInfomation}
          handlePage={this.handlePage}
          handleEditUserInfomationBtnClick={this.handleEditUserInfomationBtnClick}
        />

        <Footer />
      </div>
    );
  }
}
