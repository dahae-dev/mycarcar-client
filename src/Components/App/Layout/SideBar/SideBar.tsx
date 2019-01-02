import * as React from "react";
import Status from "./Status/Status";
import MenuList from "./MenuList/MenuList";
import { ISidebarProps } from "./ISidebar";
import "./SideBar.css";

export default class SideBar extends React.Component<ISidebarProps, {}> {
  constructor(props: ISidebarProps) {
    super(props);
  }

  render() {
    const { sidebarToggle } = this.props;
    return (
      <div className={`my-sidebar ${sidebarToggle}`}>
        <Status isSignedIn={this.props.isSignedIn} handleAuth={this.props.handleAuth} app={this.props.app} />
        <MenuList />
      </div>
    );
  }
}
