import "./EstimateForm.css";

import React, { Component } from "react";
import { EstimateFormHeader } from "./EstimateFormHeader/EstimateFormHeader";
import EstimateFormMain from "./EstimateFormMain/EstimateFormMain";

export default class EstimateForm extends Component {
  render() {
    const isSidebarOpen = JSON.parse(localStorage.getItem("isSidebarOpen") || "true");

    return (
      <div id="my-main" className={isSidebarOpen ? "" : "my-main-margin-left"}>
        <div className="estimate_form">
          <EstimateFormHeader />
          <EstimateFormMain />
        </div>
      </div>
    );
  }
}
