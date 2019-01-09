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
    return (
      <div className="Origin">
        <div className="radio" onClick={this.handleKoreaClick}>
          국산
        </div>
        <div className="radio" onClick={this.handleForeignClick}>
          수입산
        </div>
      </div>
    );
  }
}
