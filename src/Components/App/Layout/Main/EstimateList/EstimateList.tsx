import "./EstimateList.css";

import React, { Component } from "react";
import { EstimateHeader } from "./EstimateListHeader/EstimateListHeader";
import EstimateListMain from "./EstimateListMain/EstimateListMain";

export default class EstimateList extends Component {
  render() {
    const isSidebarOpen = JSON.parse(localStorage.getItem("isSidebarOpen") || "true");

    return (
      <div id="my-main" className={isSidebarOpen ? "" : "my-main-margin-left"}>
        <div className="estimate_list">
          <EstimateHeader />
          <EstimateListMain />
        </div>
      </div>
    );
  }
}
