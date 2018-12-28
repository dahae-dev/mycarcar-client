import * as React from "react";
import Status from "./Status/Status";
import MenuList from "./MenuList/MenuList";
import "./SideBar.css";

interface ISidebarProps {
  isSignedIn: boolean;
  handleClick: (comp: string) => void;
  handleLogin: (result: boolean) => void;
  handleLogout: () => void;
}

class SideBar extends React.Component<ISidebarProps, {}> {
  constructor(props: ISidebarProps) {
    super(props);
  }

  render() {
    return (
      <div className="my-sidebar">
        <Status
          isSignedIn={this.props.isSignedIn}
          handleClick={this.props.handleClick}
          handleLogin={this.props.handleLogin}
          handleLogout={this.props.handleLogout}
        />
        <MenuList />
      </div>
    );
  }
}

export default SideBar;
