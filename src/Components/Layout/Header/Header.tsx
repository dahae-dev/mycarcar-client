import * as React from "react";
import "./Header.css";
import logo from "../../../assets/img/logo.png";

interface IHeaderProps {
  handleClick: (comp: string) => void;
  handleSidebar: () => void;
}

class Header extends React.Component<IHeaderProps, {}> {
  constructor(props: IHeaderProps) {
    super(props);
  }

  render() {
    return (
      <header className="my-header">
        <a className="logo-container" onClick={() => this.props.handleClick("Home")}>
          <img className="logo-image" src={logo} alt="mycarcar logo" />
        </a>
        <a className="toggle-btn" onClick={() => this.props.handleSidebar()}>
          <i className="fa fa-bars" />
        </a>
      </header>
    );
  }
}

export default Header;
