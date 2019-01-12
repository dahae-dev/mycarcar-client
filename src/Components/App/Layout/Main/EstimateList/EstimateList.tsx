import "./EstimateList.css";

import React, { Component } from "react";

interface IEstimateListProps {}

interface IEstimateListStates {}

export default class EstimateList extends Component<IEstimateListProps, IEstimateListStates> {
  render() {
    const isSidebarOpen = JSON.parse(localStorage.getItem("isSidebarOpen") || "true");

    return (
      <div id="my-main" className={isSidebarOpen ? "" : "my-main-margin-left"}>
        <div className="estimate_list">estimate_list page</div>;
      </div>
    );
  }
}
