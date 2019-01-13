import "./EstimateFormHeader.css";

import React from "react";

export const EstimateFormHeader = () => (
  <div className="estimate_form_header">
    <div className="estimate_form_header_left">
      <i className="fa fa-television" />
      <div>견적내역</div>
    </div>
    <div className="estimate_form_header_right">
      <i className="fa fa fa-home fa-lg" />
      <span>/</span>
      <div>견적내역</div>
    </div>
  </div>
);
