import * as React from "react";
import "./Header.css";
import logo from "../../../assets/img/logo.png";

interface IHeaderProps {
  handleClick: (comp: string) => void;
}

class Header extends React.Component<IHeaderProps, {}> {
  constructor(props: IHeaderProps) {
    super(props);
  }

  render() {
    return (
      <div className="my-header">
        <a onClick={() => this.props.handleClick("Home")}>
          <img className="logo-image" src={logo} alt="mycarcar logo" />
        </a>
        {/* menu toggle button 삽입 */}
      </div>
    );
  }
}

export default Header;
