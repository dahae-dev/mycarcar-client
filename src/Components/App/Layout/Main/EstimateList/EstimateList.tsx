import "./EstimateList-header.css";
import "./EstimateList.css";

import React, { Component } from "react";

interface IEstimateListProps {}

interface IEstimateListStates {}

export default class EstimateList extends Component<IEstimateListProps, IEstimateListStates> {
  render() {
    const isSidebarOpen = JSON.parse(localStorage.getItem("isSidebarOpen") || "true");

    return (
      <div id="my-main" className={isSidebarOpen ? "" : "my-main-margin-left"}>
        <div className="estimate_list">
          <div>
            <div className="estimate_header">
              <div className="estimate_header_left">
                <i className="fa fa-television" />
                <div>견적내역</div>
              </div>
              <div className="estimate_header_right">
                <i className="fa fa fa-home fa-lg" />
                <span>/</span>
                <div>견적내역</div>
              </div>
            </div>

            <div className="estimate_main">
              <div />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
