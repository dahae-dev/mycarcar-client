import "./EstimateContent.css";

import React, { Component, MouseEvent } from "react";

import axios from "axios";
import { IHandlePage } from "../../../../App";

interface IEstimateContentProps {
  handlePage: IHandlePage;
}

interface IEstimateList {
  car_estimate_no: number;
  capital: string;
  car_brand: string;
  car_series: string;
  car_model: string;
  car_detail: string;
  car_grade: string;
  car_option: string;
  at_date: string;
}

interface IEstimateContentState {
  estimateList: IEstimateList[];
}

export default class EstimateContent extends Component<IEstimateContentProps, IEstimateContentState> {
  constructor(props: IEstimateContentProps) {
    super(props);

    this.state = {
      estimateList: [
        {
          car_estimate_no: 0,
          capital: "",
          car_brand: "",
          car_series: "",
          car_model: "",
          car_detail: "",
          car_grade: "",
          car_option: "",
          at_date: ""
        }
      ]
    };
  }

  componentDidMount() {
    const axiosOption = {
      headers: { "x-access-token": localStorage.getItem("x-access-token") }
    };

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/estimate/list`, axiosOption)
      .then((res) => {
        const estimateList = res.data.estimateList;
        this.setState({
          estimateList
        });
      })
      .catch(() => console.error("Fail : Getting estimate list"));
  }

  handleViewBtnClick = async (e: MouseEvent) => {
    const estimateNo = e.currentTarget.getAttribute("data-estimate-no") || "0";

    const axiosOption = {
      headers: { "x-access-token": localStorage.getItem("x-access-token") }
    };

    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/estimate/${estimateNo}`, axiosOption)
      .then((res) => {
        const estimateInfo = res.data.estimateInfo;
        sessionStorage.setItem("estimateInfo", JSON.stringify(estimateInfo));
      })
      .catch(() => console.error("Fail : Getting estimate infomation"));

    this.props.handlePage("/estimate_form");
  };

  render() {
    return (
      <div className="estimate_list_container">
        <div className="estimate_list">
          <h4>지난견적보기</h4>

          <hr />

          <div className="estimate_list_row">
            <div>날짜</div>
            <div>캐피탈</div>
            <div>차량정보</div>
            <div>보기</div>
          </div>

          {this.state.estimateList.map((estimate) => {
            const carInfo = `${estimate.car_brand} ${estimate.car_series} ${estimate.car_model} ${
              estimate.car_detail
            } ${estimate.car_grade} ${estimate.car_option}`;

            const atDate = new Date(estimate.at_date);
            const parseDate = `${atDate.getFullYear()} / ${atDate.getMonth() + 1} / ${atDate.getDate()}`;

            return (
              <div className="estimate_list_row" key={estimate.at_date}>
                <div>{parseDate}</div>
                <div>{estimate.capital}</div>
                <div>{carInfo}</div>
                <div>
                  <button onClick={this.handleViewBtnClick} data-estimate-no={estimate.car_estimate_no}>
                    견적서 보기
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
