import "./Rental.css";

import React, { Component, MouseEvent, FormEvent, ChangeEvent } from "react";

import Origin from "./Origin/Origin";
import { Capital } from "./Capital/Capital";
import { Modal } from "./Modal/Modal";
import { MainHeader } from "../MainHeader/MainHeader";
import { RENTAL_INITIAL_STATE, LIST_INITIAL_STATE, selectMessages } from "./RentalInitialState";
import { IRentalStates } from "./IRental";
import { RequestHandler, IConfig } from "../../../../../util/RequestHandler";

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

  async componentDidMount() {
    const requestHandler = new RequestHandler();
    const uri = `${process.env.REACT_APP_API_URL}/api/rental/brand/0`;
    const result = await requestHandler.get(uri);

    this.setState({
      ...this.state,
      carInfoState: {
        ...this.state.carInfoState,
        list: {
          ...LIST_INITIAL_STATE,
          brandList: result.data.brandList
        }
      },
      error: result.error
    });

    const modal = document.getElementById("my-modal");
    window.onclick = (e) => {
      if (e.target === modal) {
        this.setState({
          ...this.state,
          displayState: {
            ...this.state.displayState,
            detailClicked: false
          }
        });
      }
    };
  }

  handleOriginClick = async (origin: string) => {
    const originId = origin === "korea" ? 0 : 1;

    const requestHandler = new RequestHandler();
    const uri = `${process.env.REACT_APP_API_URL}/api/rental/brand/${originId}`;
    const result = await requestHandler.get(uri);

    this.setState({
      ...this.state,
      carInfoState: {
        ...this.state.carInfoState,
        origin,

        list: {
          ...LIST_INITIAL_STATE,
          brandList: result.data.brandList
        }
      },
      priceInfoState: {
        price: 0,
        optionPrice: 0,
        totalPrice: 0
      },
      radioState: {
        ...this.state.radioState,
        checkedBrand: ""
      },
      displayState: {
        ...this.state.displayState,
        listClicked: false
      },
      error: result.error
    });
  };

  handleBrandClick = async (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const brandId = parseInt(e.currentTarget.dataset.id || "-1", 10);
    const brand = value || selectMessages.none;
    if (isInvaildItem(brand)) {
      return;
    }

    const requestHandler = new RequestHandler();
    const uri = `${process.env.REACT_APP_API_URL}/api/rental/series/${brandId}`;
    const result = await requestHandler.get(uri);

    this.setState({
      ...this.state,
      carInfoState: {
        ...this.state.carInfoState,
        brand,
        list: {
          ...LIST_INITIAL_STATE,
          brandList: this.state.carInfoState.list.brandList,
          seriesList: result.data.seriesList
        }
      },
      priceInfoState: {
        price: 0,
        optionPrice: 0,
        totalPrice: 0
      },
      radioState: {
        ...this.state.radioState,
        [name]: value,
        checkedSeries: ""
      },
      displayState: {
        ...this.state.displayState,
        listClicked: false
      },
      error: result.error
    });
  };

  handleSeriesClick = async (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const seriesId = parseInt(e.currentTarget.dataset.id || "-1", 10);
    const series = value || selectMessages.none;
    if (isInvaildItem(series)) {
      return;
    }

    const requestHandler = new RequestHandler();
    const uri = `${process.env.REACT_APP_API_URL}/api/rental/model/${seriesId}`;
    const result = await requestHandler.get(uri);

    this.setState({
      ...this.state,
      carInfoState: {
        ...this.state.carInfoState,
        series,
        list: {
          ...LIST_INITIAL_STATE,
          brandList: this.state.carInfoState.list.brandList,
          seriesList: this.state.carInfoState.list.seriesList,
          modelList: result.data.modelList
        }
      },
      radioState: {
        ...this.state.radioState,
        [name]: value,
        checkedModel: ""
      },
      displayState: {
        ...this.state.displayState,
        listClicked: false
      },
      error: result.error
    });
  };

  handleModelClick = async (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const modelId = parseInt(e.currentTarget.dataset.id || "-1", 10);
    const model = value || selectMessages.none;
    if (isInvaildItem(model)) {
      return;
    }

    const requestHandler = new RequestHandler();
    const uri = `${process.env.REACT_APP_API_URL}/api/rental/detail/${modelId}`;
    const result = await requestHandler.get(uri);

    this.setState({
      ...this.state,
      carInfoState: {
        ...this.state.carInfoState,
        model,
        list: {
          ...LIST_INITIAL_STATE,
          brandList: this.state.carInfoState.list.brandList,
          seriesList: this.state.carInfoState.list.seriesList,
          modelList: this.state.carInfoState.list.modelList,
          detailList: result.data.detailList
        }
      },
      priceInfoState: {
        price: 0,
        optionPrice: 0,
        totalPrice: 0
      },
      radioState: {
        ...this.state.radioState,
        [name]: value,
        checkedDetail: ""
      },
      displayState: {
        ...this.state.displayState,
        listClicked: false
      },
      error: result.error
    });
  };

  handleDetailClick = async (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const detailId = parseInt(e.currentTarget.dataset.id || "-1", 10);
    const detail = value || selectMessages.none;
    if (isInvaildItem(detail)) {
      return;
    }

    const requestHandler = new RequestHandler();
    const uri = `${process.env.REACT_APP_API_URL}/api/rental/grade/${detailId}`;
    const result = await requestHandler.get(uri);

    this.setState({
      ...this.state,
      carInfoState: {
        ...this.state.carInfoState,
        detail,
        list: {
          ...LIST_INITIAL_STATE,
          brandList: this.state.carInfoState.list.brandList,
          seriesList: this.state.carInfoState.list.seriesList,
          modelList: this.state.carInfoState.list.modelList,
          detailList: this.state.carInfoState.list.detailList,
          gradeList: result.data.gradeList
        }
      },
      priceInfoState: {
        price: 0,
        optionPrice: 0,
        totalPrice: 0
      },
      radioState: {
        ...this.state.radioState,
        [name]: value,
        checkedGrade: ""
      },
      displayState: {
        ...this.state.displayState,
        listClicked: false
      },
      error: result.error
    });
  };

  handleGradeClick = async (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const gradeId = parseInt(e.currentTarget.dataset.id || "-1", 10);
    const grade = value || selectMessages.none;
    if (isInvaildItem(grade)) {
      return;
    }

    const requestHandler = new RequestHandler();
    const uri = `${process.env.REACT_APP_API_URL}/api/rental/option/${gradeId}`;
    const result = await requestHandler.get(uri);

    this.setState({
      ...this.state,
      carInfoState: {
        ...this.state.carInfoState,
        grade,
        list: {
          ...this.state.carInfoState.list,
          optionList: result.data.optionList
        }
      },
      priceInfoState: {
        price: result.data.car_price,
        optionPrice: 0,
        totalPrice: result.data.car_price
      },
      radioState: {
        ...this.state.radioState,
        [name]: value,
        checkedOption: ""
      },
      displayState: {
        ...this.state.displayState,
        listClicked: false
      },
      error: result.error
    });
  };

  handleOptionClick = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const option = value || selectMessages.none;
    const optionInfo = this.state.carInfoState.list.optionList.reduce(
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

    this.setState({
      ...this.state,
      carInfoState: {
        ...this.state.carInfoState,
        option
      },
      priceInfoState: {
        ...this.state.priceInfoState,
        optionPrice,
        totalPrice: this.state.priceInfoState.price + optionPrice
      },
      radioState: {
        ...this.state.radioState,
        [name]: value
      },
      displayState: {
        ...this.state.displayState,
        listClicked: false
      }
    });
  };

  handleEstimate = async () => {
    const { price } = this.state.priceInfoState;
    const { rentalPeriod, insurancePlan } = this.state.rentalTermsState;
    if (price === 0 || rentalPeriod === 0 || insurancePlan === "") {
      return alert("차량 및 조건 선택 후 견적 확인이 가능합니다.");
    }

    const requestHandler = new RequestHandler();
    const uri = `${process.env.REACT_APP_API_URL}/api/rental/capital-profit`;
    const result = await requestHandler.get(uri);

    this.setState({
      ...this.state,
      capitalInfoState: {
        ...this.state.capitalInfoState,
        capitalList: result.data.capitalList
      },
      displayState: {
        ...this.state.displayState,
        listClicked: true
      },
      error: result.error
    });
  };

  handleSelectNumber = (e: ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.currentTarget;
    const numericValue = Number(value);
    this.setState({ ...this.state, rentalTermsState: { ...this.state.rentalTermsState, [id]: numericValue } });
  };

  handleSelectString = (e: ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.currentTarget;
    this.setState({ ...this.state, rentalTermsState: { ...this.state.rentalTermsState, [id]: value } });
  };

  handleModal = (e: MouseEvent<HTMLInputElement>) => {
    const capital = e.currentTarget.dataset.capital || "";
    const profit = parseFloat(e.currentTarget.dataset.profit || "0");
    this.setState({
      ...this.state,
      displayState: { ...this.state.displayState, detailClicked: true },
      capitalInfoState: { ...this.state.capitalInfoState, capital, profit }
    });
  };

  handleSave = async () => {
    const body = {
      origin: this.state.carInfoState.origin,
      brand: this.state.carInfoState.brand,
      series: this.state.carInfoState.series,
      model: this.state.carInfoState.model,
      detail: this.state.carInfoState.detail,
      grade: this.state.carInfoState.grade,
      option: this.state.carInfoState.option,

      carPrice: this.state.priceInfoState.price,
      carOptionPrice: this.state.priceInfoState.optionPrice,

      capital: this.state.capitalInfoState.capital,
      carFinalPrice: Math.floor(
        this.state.priceInfoState.totalPrice * (1 + this.state.capitalInfoState.profit / 100) +
          (this.state.rentalTermsState.insurancePlan === "21세 이상" ? ABOVE21 : ABOVE26)
      ),

      rentalPeriod: this.state.rentalTermsState.rentalPeriod,
      insurancePlan: this.state.rentalTermsState.insurancePlan,
      deposit: this.state.rentalTermsState.deposit,
      advancePay: this.state.rentalTermsState.advancePay
    };

    const requestHandler = new RequestHandler();
    const uri = `${process.env.REACT_APP_API_URL}/api/rental/estimate`;
    const config: IConfig = {
      headers: { "x-access-token": localStorage.getItem("x-access-token") || "" }
    };
    const result = await requestHandler.post(uri, body, config);

    result.error === "" ? alert("저장된 견적서는 견적내역보기에서 확인할 수 있습니다.") : alert(result.error);

    this.setState({
      ...this.state,
      displayState: { ...this.state.displayState, detailClicked: false }
    });
  };

  render() {
    const isSidebarOpen = JSON.parse(localStorage.getItem("isSidebarOpen") || "true");
    const { price, optionPrice, totalPrice } = this.state.priceInfoState;
    const { capitalList } = this.state.capitalInfoState;
    const { rentalPeriod, insurancePlan, deposit, advancePay } = this.state.rentalTermsState;
    const { listClicked, detailClicked } = this.state.displayState;
    const { error } = this.state;

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
                {this.state.carInfoState.list.brandList.map((v) => (
                  <li className="list-group-item" key={v.car_brand}>
                    <input
                      type="radio"
                      name="checkedBrand"
                      id={v.car_brand}
                      data-id={v.car_brand_id}
                      value={v.car_brand}
                      checked={this.state.radioState.checkedBrand === v.car_brand}
                      onChange={this.handleBrandClick}
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
                {this.state.carInfoState.list.seriesList.map((v) => (
                  <li className="list-group-item" key={v.car_series}>
                    <input
                      type="radio"
                      name="checkedSeries"
                      id={v.car_series}
                      data-id={v.car_series_id}
                      value={v.car_series}
                      checked={this.state.radioState.checkedSeries === v.car_series}
                      onChange={this.handleSeriesClick}
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
                {this.state.carInfoState.list.modelList.map((v) => (
                  <li className="list-group-item" key={v.car_model}>
                    <input
                      type="radio"
                      name="checkedModel"
                      id={v.car_model}
                      data-id={v.car_model_id}
                      value={v.car_model}
                      checked={this.state.radioState.checkedModel === v.car_model}
                      onChange={this.handleModelClick}
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
                {this.state.carInfoState.list.detailList.map((v) => (
                  <li className="list-group-item" key={v.car_detail}>
                    <input
                      type="radio"
                      name="checkedDetail"
                      id={v.car_detail}
                      data-id={v.car_detail_id}
                      value={v.car_detail}
                      checked={this.state.radioState.checkedDetail === v.car_detail}
                      onChange={this.handleDetailClick}
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
                {this.state.carInfoState.list.gradeList.map((v) => (
                  <li className="list-group-item" key={v.car_grade}>
                    <input
                      type="radio"
                      name="checkedGrade"
                      id={v.car_grade}
                      data-id={v.car_grade_id}
                      value={v.car_grade}
                      checked={this.state.radioState.checkedGrade === v.car_grade}
                      onChange={this.handleGradeClick}
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
                {this.state.carInfoState.list.optionList.map((v) => (
                  <li className="list-group-item apply_display_flex_sb" key={v.car_option}>
                    <input
                      type="radio"
                      name="checkedOption"
                      id={v.car_option}
                      data-id={v.car_option_id}
                      value={v.car_option}
                      checked={this.state.radioState.checkedOption === v.car_option}
                      onChange={this.handleOptionClick}
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
                  <select
                    id="rentalPeriod"
                    value={this.state.rentalTermsState.rentalPeriod}
                    onChange={this.handleSelectNumber}
                    required
                  >
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
                    value={this.state.rentalTermsState.insurancePlan}
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
                  <select
                    id="deposit"
                    value={this.state.rentalTermsState.deposit}
                    onChange={this.handleSelectNumber}
                    required
                  >
                    <option hidden>선택</option>
                    <option value="0">0%</option>
                    <option value="0.1">10%</option>
                    <option value="0.2">20%</option>
                    <option value="0.3">30%</option>
                  </select>
                </li>
                <li className="list-group-item apply_display_flex_sb">
                  <label htmlFor="advancePay">선납금</label>
                  <select
                    id="advancePay"
                    value={this.state.rentalTermsState.advancePay}
                    onChange={this.handleSelectNumber}
                    required
                  >
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

          {error ? <div className="rental-error-msg">{error}</div> : <div />}

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
