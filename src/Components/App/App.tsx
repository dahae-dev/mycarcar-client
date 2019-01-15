import "./App.css";

import React, { Component } from "react";

import { Header, SideBar, Main, Footer } from "./Layout";

export interface IHandlePage {
  (pathname: string): void;
}

export default class App extends Component {
  constructor(props: {}) {
    super(props);
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

  handleSidebar = () => {
    let isSidebarOpen = JSON.parse(localStorage.getItem("isSidebarOpen") || "true");
    isSidebarOpen = JSON.stringify(!isSidebarOpen);

    localStorage.setItem("isSidebarOpen", isSidebarOpen);
    this.forceUpdate();
  };

  handlePage = (pathname: string) => {
    history.pushState(null, "", pathname);
    this.forceUpdate();
  };

  render() {
    return (
      <div className="grid-container">
        <Header handlePage={this.handlePage} handleSidebar={this.handleSidebar} />

        <SideBar handlePage={this.handlePage} handleSidebar={this.handleSidebar} />

        <Main handlePage={this.handlePage} />

        <Footer />
      </div>
    );
  }
}
