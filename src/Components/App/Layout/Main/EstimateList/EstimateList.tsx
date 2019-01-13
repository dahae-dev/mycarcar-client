import "./EstimateList.css";

import React, { Component } from "react";
import { MainHeader } from "../MainHeader/MainHeader";

export default class EstimateList extends Component {
  render() {
    const isSidebarOpen = JSON.parse(localStorage.getItem("isSidebarOpen") || "true");

    return (
      <div id="my-main" className={isSidebarOpen ? "" : "my-main-margin-left"}>
        <MainHeader title="견적내역" />
        <div className="estimate_list_container">
          <div className="estimate_list">
            <h4>지난견적보기</h4>

            <hr />

            <div className="estimate_list_row">
              <div>날짜</div>
              <div>고객명</div>
              <div>차량정보</div>
              <div>보기</div>
            </div>

            <div className="estimate_list_row">
              <div>18/11/11</div>
              <div>달고나</div>
              <div>스파크_1.0_가솔린_5인승_ LS</div>
              <div>
                <button>견적서 보기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
