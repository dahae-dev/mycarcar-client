import "./Header.css";

import React from "react";
import logo from "assets/img/logo.png";
import { IHandlePage } from "../../App";

interface IHeaderProps {
  handleSidebar: () => void;
  handlePage: IHandlePage;
}

export default class Header extends React.Component<IHeaderProps> {
  constructor(props: IHeaderProps) {
    super(props);
  }

  handleLogoClick = () => {
    this.props.handlePage("/");
  };

  render() {
    return (
      <header id="my-header">
        <a className="logo-container">
          <img className="logo-image" src={logo} alt="mycarcar logo" onClick={this.handleLogoClick} />
        </a>
        <a className="toggle-btn" onClick={this.props.handleSidebar}>
          <i className="fa fa-bars" />
        </a>
      </header>
    );
  }
}
