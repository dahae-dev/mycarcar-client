import React from "react";

import { MainHeader } from "../MainHeader/MainHeader";
import EstimateContent from "./EstimateContent/EstimateContent";
import { IHandlePage } from "../../../App";

interface IEstimateListProps {
  handlePage: IHandlePage;
}

export const EstimateList = (props: IEstimateListProps) => {
  const isSidebarOpen = JSON.parse(localStorage.getItem("isSidebarOpen") || "true");

  return (
    <div id="my-main" className={isSidebarOpen ? "" : "my-main-margin-left"}>
      <MainHeader title="견적내역" icon="calculator" />
      <EstimateContent handlePage={props.handlePage} />
    </div>
  );
};
