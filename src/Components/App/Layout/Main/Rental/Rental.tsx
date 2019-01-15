import "./Rental.css";

import React, { Component, MouseEvent, FormEvent, ChangeEvent } from "react";
import axios from "axios";

import Origin from "./Origin/Origin";
import { Capital } from "./Capital/Capital";
import { Modal } from "./Modal/Modal";
import { MainHeader } from "../MainHeader/MainHeader";
import { RENTAL_INITIAL_STATE } from "./RentalInitialState";
import { IRentalStates, ISelectMessages, IBrand, ISeries, IModel, IDetail, IGrade, IOption } from "./IRental";

export const selectMessages: ISelectMessages = {
  none: "정보없음",
  series: "제조사를 선택해주세요.",
  model: "시리즈를 선택해주세요.",
  detail: "모델을 선택해주세요.",
  grade: "상세모델을 선택해주세요.",
  option: "등급을 선택해주세요."
};

function isInvaildItem(item: string): boolean {
  for (const msg in selectMessages) {
    if (item === selectMessages[msg]) {
      return true;
    }
  }

  return false;
}

export const ABOVE21 = 1000000;
export const ABOVE26 = 600000;

export default class Rental extends Component<{}, IRentalStates> {
  constructor(props: {}) {
    super(props);

    this.state = RENTAL_INITIAL_STATE;
  }

  handleCheck = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    this.setState({ radioState: { [name]: value } });
  };

  handleSelectNumber = (e: ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.currentTarget;
    const numericValue = Number(value);
    this.setState({ [id]: numericValue });
  };

  handleSelectString = (e: ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.currentTarget;
    this.setState({ [id]: value });
  };

  handleModal = (e: MouseEvent<HTMLInputElement>) => {
    const capital = e.currentTarget.dataset.capital || "";
    const profit = parseFloat(e.currentTarget.dataset.profit || "0");
    this.setState({ detailClicked: true, capital, profit });
  };

  handleSave = () => {
    const body = {
      origin: this.state.origin,
      brand: this.state.brand,
      series: this.state.series,
      model: this.state.model,
      detail: this.state.detail,
      grade: this.state.grade,
      option: this.state.option,

      carPrice: this.state.price,
      carOptionPrice: this.state.optionPrice,

      capital: this.state.capital,
      carFinalPrice: Math.floor(
        this.state.totalPrice * (1 + this.state.profit / 100) +
          (this.state.insurancePlan === "21세 이상" ? ABOVE21 : ABOVE26)
      ),

      rentalPeriod: this.state.rentalPeriod,
      insurancePlan: this.state.insurancePlan,
      deposit: this.state.deposit,
      advancePay: this.state.advancePay
    };

    const config = {
      headers: { "x-access-token": localStorage.getItem("x-access-token") || "" }
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/rental/estimate`, body, config)
      .then((res) => {
        this.setState({ detailClicked: false });
        alert("저장된 견적서는 견적내역보기에서 확인할 수 있습니다.");
      })
      .catch((err) => alert(err.message));
  };

  handleOriginClick = (origin: string) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/rental/${origin}`)
      .then((res) => {
        const brandList: IBrand[] = res.data.brandList;
        this.setState({
          brandList,
          origin,
          seriesList: [{ car_series: selectMessages.series }],
          modelList: [{ car_model: selectMessages.model }],
          detailList: [{ car_detail: selectMessages.detail }],
          gradeList: [{ car_grade: selectMessages.grade }],
          optionList: [{ car_option: selectMessages.option, car_option_price: 0 }],
          price: 0,
          optionPrice: 0,
          totalPrice: 0,
          listClicked: false
        });
      })
      .catch((err: Error) => {
        alert(err.message);
      });
  };

  handleBrandClick = (e: MouseEvent<HTMLLIElement>) => {
    const brand = e.currentTarget.textContent || selectMessages.none;
    if (isInvaildItem(brand)) {
      return;
    }

    const origin = this.state.origin;
    const encodedBrand = encodeURI(brand);

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/rental/${origin}/${encodedBrand}`)
      .then((res) => {
        const seriesList: ISeries[] = res.data.seriesList;

        this.setState({
          seriesList,
          brand,
          modelList: [{ car_model: selectMessages.model }],
          detailList: [{ car_detail: selectMessages.detail }],
          gradeList: [{ car_grade: selectMessages.grade }],
          optionList: [{ car_option: selectMessages.option, car_option_price: 0 }],
          price: 0,
          optionPrice: 0,
          totalPrice: 0,
          listClicked: false
        });
      })
      .catch((err: Error) => {
        alert(err.message);
      });
  };

  handleSeriesClick = (e: MouseEvent<HTMLLIElement>) => {
    const series = e.currentTarget.textContent || selectMessages.none;
    if (isInvaildItem(series)) {
      return;
    }

    const origin = this.state.origin;
    const brand = this.state.brand;

    const encodedBrand = encodeURI(brand);
    const encodedSeries = encodeURI(series);

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/rental/${origin}/${encodedBrand}/${encodedSeries}`)
      .then((res) => {
        const modelList: IModel[] = res.data.modelList;
        this.setState({
          modelList,
          series,
          detailList: [{ car_detail: selectMessages.detail }],
          gradeList: [{ car_grade: selectMessages.grade }],
          optionList: [{ car_option: selectMessages.option, car_option_price: 0 }],
          price: 0,
          optionPrice: 0,
          totalPrice: 0,
          listClicked: false
        });
      })
      .catch((err: Error) => {
        alert(err.message);
      });
  };

  handleModelClick = (e: MouseEvent<HTMLLIElement>) => {
    const model = e.currentTarget.textContent || selectMessages.none;
    if (isInvaildItem(model)) {
      return;
    }

    const origin = this.state.origin;
    const brand = this.state.brand;
    const series = this.state.series;

    const encodedBrand = encodeURI(brand);
    const encodedSeries = encodeURI(series);
    const encodedModel = encodeURI(model);

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/rental/${origin}/${encodedBrand}/${encodedSeries}/${encodedModel}`)
      .then((res) => {
        const detailList: IDetail[] = res.data.detailList;
        this.setState({
          detailList,
          model,
          gradeList: [{ car_grade: selectMessages.grade }],
          optionList: [{ car_option: selectMessages.option, car_option_price: 0 }],
          price: 0,
          optionPrice: 0,
          totalPrice: 0,
          listClicked: false
        });
      })
      .catch((err: Error) => {
        alert(err.message);
      });
  };

  handleDetailClick = (e: MouseEvent<HTMLLIElement>) => {
    const detail = e.currentTarget.textContent || selectMessages.none;
    if (isInvaildItem(detail)) {
      return;
    }

    const origin = this.state.origin;
    const brand = this.state.brand;
    const series = this.state.series;
    const model = this.state.model;

    const encodedBrand = encodeURI(brand);
    const encodedSeries = encodeURI(series);
    const encodedModel = encodeURI(model);
    const encodedDetail = encodeURI(detail);

    axios
      .get(
        `${
          process.env.REACT_APP_API_URL
        }/api/rental/${origin}/${encodedBrand}/${encodedSeries}/${encodedModel}/${encodedDetail}`
      )
      .then((res) => {
        const gradeList: IGrade[] = res.data.gradeList;
        this.setState({
          gradeList,
          detail,
          optionList: [{ car_option: selectMessages.option, car_option_price: 0 }],
          price: 0,
          optionPrice: 0,
          totalPrice: 0,
          listClicked: false
        });
      })
      .catch((err: Error) => {
        alert(err.message);
      });
  };

  handleGradeClick = (e: MouseEvent<HTMLLIElement>) => {
    const grade = e.currentTarget.textContent || selectMessages.none;
    if (isInvaildItem(grade)) {
      return;
    }

    const origin = this.state.origin;
    const brand = this.state.brand;
    const series = this.state.series;
    const model = this.state.model;
    const detail = this.state.detail;

    const encodedBrand = encodeURI(brand);
    const encodedSeries = encodeURI(series);
    const encodedModel = encodeURI(model);
    const encodedDetail = encodeURI(detail);
    const encodedGrade = encodeURI(grade);

    axios
      .get(
        `${
          process.env.REACT_APP_API_URL
        }/api/rental/${origin}/${encodedBrand}/${encodedSeries}/${encodedModel}/${encodedDetail}/${encodedGrade}`
      )
      .then((res) => {
        const price = res.data.car_price;
        const optionList: IOption[] = res.data.optionList;
        this.setState({ optionList, grade, price, optionPrice: 0, totalPrice: price, listClicked: false });
      })
      .catch((err: Error) => {
        alert(err.message);
      });
  };

  handleOptionClick = (e: MouseEvent<HTMLLIElement>) => {
    const option = e.currentTarget.children[1].children[0].textContent || selectMessages.none;
    const optionInfo = this.state.optionList.reduce(
      (accu, curr) => {
        return curr.car_option === option ? curr : accu;
      },
      {
        car_option: selectMessages.none,
        car_option_price: 0
      }
    );

    const optionPrice = optionInfo.car_option_price;

    if (isInvaildItem(option)) {
      return;
    }

    this.setState({ option, optionPrice, totalPrice: this.state.price + optionPrice, listClicked: false });
  };

  handleEstimate = () => {
    const { price, rentalPeriod, insurancePlan } = this.state;
    if (price === 0 || rentalPeriod === 0 || insurancePlan === "") {
      return alert("차량 및 조건 선택 후 견적 확인이 가능합니다.");
    }

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/rental/capital-profit`)
      .then((res) => {
        this.setState({ capitalList: res.data.capitalList, listClicked: true });
      })
      .catch((err) => alert(err.message));
  };

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/rental/korea`)
      .then((res) => {
        const brandList: IBrand[] = res.data.brandList;
        this.setState({ brandList });
      })
      .catch((err: Error) => {
        alert(err.message);
      });

    const modal = document.getElementById("my-modal");
    window.onclick = (e) => {
      if (e.target === modal) {
        this.setState({ detailClicked: false });
      }
    };
  }

  render() {
    const isSidebarOpen = JSON.parse(localStorage.getItem("isSidebarOpen") || "true");
    const {
      price,
      optionPrice,
      totalPrice,
      capitalList,
      rentalPeriod,
      insurancePlan,
      deposit,
      advancePay,
      listClicked,
      detailClicked
    } = this.state;

    return (
      <div id="my-main" className={isSidebarOpen ? "" : "my-main-margin-left"}>
        <MainHeader title="장기렌트" icon="car" />
        <div className="select_car">
          <div className="item_lists">
            <div className="item_list">
              <div className="item_lists_title">
                <div className="item_list_title">
                  <div className="item_list_title">제조사</div>
                </div>
                <Origin handleOriginClick={this.handleOriginClick} />
              </div>
              <ul className="list_group">
                {this.state.brandList.map((v) => (
                  <li className="list-group-item" onClick={this.handleBrandClick} key={v.car_brand}>
                    <input
                      type="radio"
                      name="checkedBrand"
                      id={v.car_brand}
                      value={v.car_brand}
                      checked={this.state.checkedBrand === v.car_brand}
                      onChange={this.handleCheck}
                    />
                    <label htmlFor={v.car_brand}>{v.car_brand}</label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="item_list">
              <div className="item_lists_title">
                <div className="item_list_title">시리즈</div>
              </div>
              <ul className="list_group">
                {this.state.seriesList.map((v) => (
                  <li className="list-group-item" onClick={this.handleSeriesClick} key={v.car_series}>
                    <input
                      type="radio"
                      name="checkedSeries"
                      id={v.car_series}
                      value={v.car_series}
                      checked={this.state.checkedSeries === v.car_series}
                      onChange={this.handleCheck}
                    />
                    <label htmlFor={v.car_series}>{v.car_series}</label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="item_list">
              <div className="item_lists_title">
                <div className="item_list_title">모델명</div>
              </div>
              <ul className="list_group">
                {this.state.modelList.map((v) => (
                  <li className="list-group-item" onClick={this.handleModelClick} key={v.car_model}>
                    <input
                      type="radio"
                      name="checkedModel"
                      id={v.car_model}
                      value={v.car_model}
                      checked={this.state.checkedModel === v.car_model}
                      onChange={this.handleCheck}
                    />
                    <label htmlFor={v.car_model}>{v.car_model}</label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="item_list">
              <div className="item_lists_title">
                <div className="item_list_title">상세모델</div>
              </div>
              <ul className="list_group">
                {this.state.detailList.map((v) => (
                  <li className="list-group-item" onClick={this.handleDetailClick} key={v.car_detail}>
                    <input
                      type="radio"
                      name="checkedDetail"
                      id={v.car_detail}
                      value={v.car_detail}
                      checked={this.state.checkedDetail === v.car_detail}
                      onChange={this.handleCheck}
                    />
                    <label htmlFor={v.car_detail}>{v.car_detail}</label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="item_list">
              <div className="item_lists_title">
                <div className="item_list_title">등급</div>
              </div>
              <ul className="list_group">
                {this.state.gradeList.map((v) => (
                  <li className="list-group-item" onClick={this.handleGradeClick} key={v.car_grade}>
                    <input
                      type="radio"
                      name="checkedGrade"
                      id={v.car_grade}
                      value={v.car_grade}
                      checked={this.state.checkedGrade === v.car_grade}
                      onChange={this.handleCheck}
                    />
                    <label htmlFor={v.car_grade}>{v.car_grade}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="option_and_price">
            <div className="option">
              <div className="item_lists_title">
                <div className="item_list_title">옵션</div>
              </div>
              <ul className="list_group">
                {this.state.optionList.map((v) => (
                  <li
                    className="list-group-item apply_display_flex_sb"
                    onClick={this.handleOptionClick}
                    key={v.car_option}
                  >
                    <input
                      type="radio"
                      name="checkedOption"
                      id={v.car_option}
                      value={v.car_option}
                      checked={this.state.checkedOption === v.car_option}
                      onChange={this.handleCheck}
                    />
                    <label htmlFor={v.car_option}>
                      <span>{v.car_option}</span>
                      <span>{`${v.car_option_price.toLocaleString()}원`}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rent-condition">
              <div className="item_lists_title">
                <div className="item_list_title">렌탈조건</div>
              </div>
              <ul className="list_group">
                <li className="list-group-item apply_display_flex_sb">
                  <label htmlFor="rentalPeriod">렌탈기간</label>
                  <select id="rentalPeriod" value={this.state.rentalPeriod} onChange={this.handleSelectNumber} required>
                    <option hidden>선택</option>
                    <option value="12">12개월</option>
                    <option value="24">24개월</option>
                    <option value="36">36개월</option>
                    <option value="48">48개월</option>
                    <option value="60">60개월</option>
                  </select>
                </li>
                <li className="list-group-item apply_display_flex_sb">
                  <label htmlFor="insurancePlan">보험담보</label>
                  <select
                    id="insurancePlan"
                    value={this.state.insurancePlan}
                    onChange={this.handleSelectString}
                    required
                  >
                    <option hidden>선택</option>
                    <option value="21세 이상">21세 이상</option>
                    <option value="26세 이상">26세 이상</option>
                  </select>
                </li>
                <li className="list-group-item apply_display_flex_sb">
                  <label htmlFor="deposit">보증금</label>
                  <select id="deposit" value={this.state.deposit} onChange={this.handleSelectNumber} required>
                    <option hidden>선택</option>
                    <option value="0">0%</option>
                    <option value="0.1">10%</option>
                    <option value="0.2">20%</option>
                    <option value="0.3">30%</option>
                  </select>
                </li>
                <li className="list-group-item apply_display_flex_sb">
                  <label htmlFor="advancePay">선납금</label>
                  <select id="advancePay" value={this.state.advancePay} onChange={this.handleSelectNumber} required>
                    <option hidden>선택</option>
                    <option value="0">0%</option>
                    <option value="0.1">10%</option>
                    <option value="0.2">20%</option>
                    <option value="0.3">30%</option>
                  </select>
                </li>
              </ul>
            </div>

            <div className="price">
              <div>
                차량가격 : <span>{`${price.toLocaleString()}원`}</span>
              </div>
              <div>
                옵션가격 : <span>{`${optionPrice.toLocaleString()}원`}</span>
              </div>
              <hr />
              <div>
                합 계 : <span>{`${totalPrice.toLocaleString()}원`}</span>
              </div>
            </div>
          </div>

          <div className="btn-container">
            <input type="button" value="견적 확인" disabled={listClicked} onClick={this.handleEstimate} />
          </div>

          <div className={"capital-list-container " + (listClicked ? "" : "display-none")}>
            <Capital
              totalPrice={totalPrice}
              capitalList={capitalList}
              rentalPeriod={rentalPeriod}
              insurancePlan={insurancePlan}
              deposit={deposit}
              advancePay={advancePay}
              handleModal={this.handleModal}
            />
          </div>

          <div id="my-modal" className={detailClicked ? "show-my-modal" : "display-none"}>
            <Modal handleSave={this.handleSave} rentalData={this.state} />
          </div>
        </div>
      </div>
    );
  }
}
