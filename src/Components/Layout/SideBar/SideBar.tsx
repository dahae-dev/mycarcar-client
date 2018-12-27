import * as React from "react";
import Status from "./Status/Status";
import MenuList from "./MenuList/MenuList";
import "./SideBar.css";

interface ISidebarProps {
  isSignedIn: boolean;
  handleClickLogin: () => void;
  handleClickLogout: () => void;
  handleClickRegister: () => void;
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
          handleClickLogin={this.props.handleClickLogin}
          handleClickLogout={this.props.handleClickLogout}
          handleClickRegister={this.props.handleClickRegister}
        />
        <MenuList />
      </div>
    );
  }
}

export default SideBar;
