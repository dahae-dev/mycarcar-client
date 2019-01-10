import "./Origin.css";

import React, { Component, MouseEvent } from "react";

interface IOriginProps {
  handleOriginClick: (origin: string) => void;
}

interface IOriginStates {
  isKorea: boolean;
}

export default class Origin extends Component<IOriginProps, IOriginStates> {
  constructor(props: IOriginProps) {
    super(props);

    this.state = {
      isKorea: true,
    };

    this.handleKoreaClick = this.handleKoreaClick.bind(this);
    this.handleForeignClick = this.handleForeignClick.bind(this);
  }

  handleKoreaClick(e: MouseEvent) {
    this.props.handleOriginClick("korea");
    this.setState({
      isKorea: true,
    });
  }

  handleForeignClick(e: MouseEvent) {
    this.props.handleOriginClick("foreign");
    this.setState({
      isKorea: false,
    });
  }

  public render() {
    const isKorea = this.state.isKorea;

    return (
      <div className="origin">
        <div className={`origin_radio ${isKorea ? "checked_radio" : ""}`} onClick={this.handleKoreaClick}>
          국산차
        </div>
        <div className={`origin_radio ${isKorea ? "" : "checked_radio"}`} onClick={this.handleForeignClick}>
          수입차
        </div>
      </div>
    );
  }
}
