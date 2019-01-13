import React from "react";

import { MainHeader } from "../MainHeader/MainHeader";
import EstimateContent from "./EstimateContent/EstimateContent";

export const EstimateList = () => {
  const isSidebarOpen = JSON.parse(localStorage.getItem("isSidebarOpen") || "true");

  return (
    <div id="my-main" className={isSidebarOpen ? "" : "my-main-margin-left"}>
      <MainHeader title="견적내역" />
      <EstimateContent />
    </div>
  );
};
