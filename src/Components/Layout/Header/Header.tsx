import * as React from "react";
import "./Header.css";
import logo from "../../../assets/img/logo.png";

class Header extends React.Component {
  render() {
    return (
      <div className="my-header">
        <img className="logo-image" src={logo} alt="mycarcar logo" />
        {/* menu toggle button 삽입 */}
      </div>
    );
  }
}

export default Header;
