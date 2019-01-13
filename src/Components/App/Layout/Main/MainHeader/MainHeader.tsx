import "./MainHeader.css";

import React from "react";

interface IMainHeaderProps {
  title: string;
}

export const MainHeader = (props: IMainHeaderProps) => (
  <div className="main_header">
    <div>
      <i className="fa fa-television" />
      <span>{props.title}</span>
    </div>
    <div>
      <i className="fa fa fa-home fa-lg" />
      <span>/</span>
      <span>{props.title}</span>
    </div>
  </div>
);
