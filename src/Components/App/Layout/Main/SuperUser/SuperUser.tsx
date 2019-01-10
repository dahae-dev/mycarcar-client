import "./SuperUser.css";

import React, { Component } from "react";

interface ISuperUserProps {}

interface ISuperUserStates {}

export default class SuperUser extends Component<ISuperUserProps, ISuperUserStates> {
  public render() {
    return <div className="super_user">Super User Page</div>;
  }
}
