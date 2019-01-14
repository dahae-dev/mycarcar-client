import "./MainHeader.css";

import React from "react";

interface IMainHeaderProps {
  title: string;
  icon: string;
}

export const MainHeader = (props: IMainHeaderProps) => (
  <div className="main_header">
    <div>
      <i className={`fa fa-${props.icon}`} />
      <span>{props.title}</span>
    </div>
    <div>
      <i className="fa fa fa-home fa-lg" />
      <span>/</span>
      <span>{props.title}</span>
    </div>
  </div>
);
