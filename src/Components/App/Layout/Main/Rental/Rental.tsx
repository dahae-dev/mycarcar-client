import "./Rental.css";

import React, { Component, MouseEvent, FormEvent, ChangeEvent } from "react";

import Origin from "./Origin/Origin";
import Capital from "./Capital/Capital";
import Modal from "./Modal/Modal";
import { MainHeader } from "../MainHeader/MainHeader";
import { DEFAULT_RENTAL_STATE, DEFAULT_VALUE, DEFAULT_PRICE, DEFAULT_LIST } from "./RentalInitialState";
import { IRentalStates, IBrand, ISeries, IModel, IDetail, IGrade, IOption } from "./IRental";
import { RequestHandler, IConfig } from "../../../../../util/RequestHandler";

function isInvaildItem(item: string): boolean {
  for (const key in DEFAULT_VALUE) {
    if (item === DEFAULT_VALUE[key]) {
      return true;
    }
  }
  return false;
}

export const ABOVE21 = 1000000;
export const ABOVE26 = 600000;

export default class Rental extends Component<{}, IRentalStates> {
  state: IRentalStates;

  constructor(props: {}) {
    super(props);

    this.state = DEFAULT_RENTAL_STATE;
  }

  async componentDidMount() {
    const requestHandler = new RequestHandler();
    const uri = `${process.env.REACT_APP_API_URL}/api/rental/brand/0`;
    const result = await requestHandler.get(uri);

    const { currentList, displayState } = this.state;
    this.setState({
      currentList: currentList.set("brandList", result.data.brandList),
      error: result.error
    });

    const modal = document.getElementById("my-modal") as HTMLElement;
    const body = document.getElementById("body") as HTMLElement;
    window.onclick = (e) => {
      if (e.target === modal) {
        body.classList.remove("modal-open");
        this.setState({
          displayState: displayState.set("detailClicked", false).set("listClicked", true)
        });
      }
    };
  }

  handleOriginClick = async (origin: string) => {
    const originId = origin === "korea" ? 0 : 1;

    const requestHandler = new RequestHandler();
    const uri = `${process.env.REACT_APP_API_URL}/api/rental/brand/${originId}`;
    const result = await requestHandler.get(uri);

    const { currentItem, currentList, displayState } = this.state;
    this.setState({
      currentItem: currentItem.set("origin", origin).set("brand", ""),
      currentList: currentList.set("brandList", result.data.brandList),
      currentPrice: DEFAULT_PRICE,
      displayState: displayState.set("listClicked", false),
      error: result.error
    });
  };

  handleBrandClick = async (e: FormEvent<HTMLInputElement>) => {
    const brandId = parseInt(e.currentTarget.dataset.id || "-1", 10);
    const brand = e.currentTarget.value || DEFAULT_VALUE.none;
    if (isInvaildItem(brand)) {
      return;
    }

    const requestHandler = new RequestHandler();
    const uri = `${process.env.REACT_APP_API_URL}/api/rental/series/${brandId}`;
    const result = await requestHandler.get(uri);

    const { currentItem, currentList, displayState } = this.state;
    this.setState({
      currentItem: currentItem.set("brand", brand).set("series", ""),
      currentList: DEFAULT_LIST.set("seriesList", result.data.seriesList).set(
        "brandList",
        currentList.get("brandList")
      ),
      currentPrice: DEFAULT_PRICE,
      displayState: displayState.set("listClicked", false),
      error: result.error
    });
  };

  handleSeriesClick = async (e: FormEvent<HTMLInputElement>) => {
    const seriesId = parseInt(e.currentTarget.dataset.id || "-1", 10);
    const series = e.currentTarget.value || DEFAULT_VALUE.none;
    if (isInvaildItem(series)) {
      return;
    }

    const requestHandler = new RequestHandler();
    const uri = `${process.env.REACT_APP_API_URL}/api/rental/model/${seriesId}`;
    const result = await requestHandler.get(uri);

    const { currentItem, currentList, displayState } = this.state;
    this.setState({
      currentItem: currentItem.set("series", series).set("model", ""),
      currentList: DEFAULT_LIST.set("modelList", result.data.modelList)
        .set("brandList", currentList.get("brandList"))
        .set("seriesList", currentList.get("seriesList")),
      currentPrice: DEFAULT_PRICE,
      displayState: displayState.set("listClicked", false),
      error: result.error
    });
  };

  handleModelClick = async (e: FormEvent<HTMLInputElement>) => {
    const modelId = parseInt(e.currentTarget.dataset.id || "-1", 10);
    const model = e.currentTarget.value || DEFAULT_VALUE.none;
    if (isInvaildItem(model)) {
      return;
    }

    const requestHandler = new RequestHandler();
    const uri = `${process.env.REACT_APP_API_URL}/api/rental/detail/${modelId}`;
    const result = await requestHandler.get(uri);

    const { currentItem, currentList, displayState } = this.state;
    this.setState({
      currentItem: currentItem.set("model", model).set("detail", ""),
      currentList: DEFAULT_LIST.set("detailList", result.data.detailList)
        .set("brandList", currentList.get("brandList"))
        .set("seriesList", currentList.get("seriesList"))
        .set("modelList", currentList.get("modelList")),
      currentPrice: DEFAULT_PRICE,
      displayState: displayState.set("listClicked", false),
      error: result.error
    });
  };

  handleDetailClick = async (e: FormEvent<HTMLInputElement>) => {
    const detailId = parseInt(e.currentTarget.dataset.id || "-1", 10);
    const detail = e.currentTarget.value || DEFAULT_VALUE.none;
    if (isInvaildItem(detail)) {
      return;
    }

    const requestHandler = new RequestHandler();
    const uri = `${process.env.REACT_APP_API_URL}/api/rental/grade/${detailId}`;
    const result = await requestHandler.get(uri);

    const { currentItem, currentList, displayState } = this.state;
    this.setState({
      currentItem: currentItem.set("detail", detail).set("grade", ""),
      currentList: DEFAULT_LIST.set("gradeList", result.data.gradeList)
        .set("brandList", currentList.get("brandList"))
        .set("seriesList", currentList.get("seriesList"))
        .set("modelList", currentList.get("modelList"))
        .set("detailList", currentList.get("detailList")),
      currentPrice: DEFAULT_PRICE,
      displayState: displayState.set("listClicked", false),
      error: result.error
    });
  };

  handleGradeClick = async (e: FormEvent<HTMLInputElement>) => {
    const gradeId = parseInt(e.currentTarget.dataset.id || "-1", 10);
    const grade = e.currentTarget.value || DEFAULT_VALUE.none;
    if (isInvaildItem(grade)) {
      return;
    }

    const requestHandler = new RequestHandler();
    const uri = `${process.env.REACT_APP_API_URL}/api/rental/option/${gradeId}`;
    const result = await requestHandler.get(uri);

    const { currentItem, currentList, currentPrice, displayState } = this.state;
    this.setState({
      currentItem: currentItem.set("grade", grade).set("option", ""),
      currentList: currentList.set("optionList", result.data.optionList),
      currentPrice: currentPrice
        .set("price", result.data.car_price)
        .set("optionPrice", 0)
        .set("totalPrice", result.data.car_price),
      displayState: displayState.set("listClicked", false),
      error: result.error
    });
  };

  handleOptionClick = (e: FormEvent<HTMLInputElement>) => {
    const option = e.currentTarget.value || DEFAULT_VALUE.none;
    const optionInfo = this.state.currentList.toObject().optionList.reduce(
      (accu: IOption, curr: IOption) => {
        return curr.car_option === option ? curr : accu;
      },
      {
        car_option_id: -1,
        car_option: DEFAULT_VALUE.none,
        car_option_price: 0
      }
    );

    const optionPrice = optionInfo.car_option_price;

    if (isInvaildItem(option)) {
      return;
    }

    const { currentItem, currentPrice, displayState } = this.state;
    this.setState({
      currentItem: currentItem.set("option", option),
      currentPrice: currentPrice
        .set("optionPrice", optionPrice)
        .set("totalPrice", currentPrice.toObject().price + optionPrice),
      displayState: displayState.set("listClicked", false)
    });
  };

  handleEstimate = async () => {
    const { price } = this.state.currentPrice.toObject();
    const { rentalPeriod, insurancePlan } = this.state.currentTerms.toObject();
    if (price === 0 || rentalPeriod === 0 || insurancePlan === "") {
      return alert("차량 및 조건 선택 후 견적 확인이 가능합니다.");
    }

    const requestHandler = new RequestHandler();
    const uri = `${process.env.REACT_APP_API_URL}/api/rental/capital-profit`;
    const result = await requestHandler.get(uri);

    const { displayState } = this.state;
    this.setState({
      capitalList: result.data.capitalList,
      displayState: displayState.set("listClicked", true),
      error: result.error
    });
  };

  handleSelectNumber = (e: ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.currentTarget;
    const numericValue = Number(value);
    const { currentTerms } = this.state;
    this.setState({ currentTerms: currentTerms.merge({ [id]: numericValue }) });
  };

  handleSelectString = (e: ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.currentTarget;
    const { currentTerms } = this.state;
    this.setState({ currentTerms: currentTerms.merge({ [id]: value }) });
  };

  handleModal = (e: MouseEvent<HTMLInputElement>) => {
    const body = document.getElementById("body") as HTMLElement;
    body.classList.add("modal-open");

    const capital = e.currentTarget.dataset.capital || "";
    const profit = parseFloat(e.currentTarget.dataset.profit || "0");
    const { displayState, currentCapital } = this.state;
    this.setState({
      displayState: displayState.set("detailClicked", true),
      currentCapital: currentCapital.set("capital", capital).set("profit", profit)
    });
  };

  handleSave = async () => {
    const body = document.getElementById("body") as HTMLElement;
    body.classList.remove("modal-open");

    const { origin, brand, series, model, detail, grade, option } = this.state.currentItem.toObject();
    const { price, optionPrice, totalPrice } = this.state.currentPrice.toObject();
    const { capital, profit } = this.state.currentCapital.toObject();
    const { insurancePlan, rentalPeriod, deposit, advancePay } = this.state.currentTerms.toObject();

    const reqBody = {
      origin,
      brand,
      series,
      model,
      detail,
      grade,
      option,
      carPrice: price,
      carOptionPrice: optionPrice,
      capital,
      carFinalPrice: Math.floor(totalPrice * (1 + profit / 100) + (insurancePlan === "21세 이상" ? ABOVE21 : ABOVE26)),
      rentalPeriod,
      insurancePlan,
      deposit,
      advancePay
    };

    const requestHandler = new RequestHandler();
    const uri = `${process.env.REACT_APP_API_URL}/api/rental/estimate`;
    const config: IConfig = {
      headers: { "x-access-token": localStorage.getItem("x-access-token") || "" }
    };
    const result = await requestHandler.post(uri, reqBody, config);

    result.error === "" ? alert("저장된 견적서는 견적내역보기에서 확인할 수 있습니다.") : alert(result.error);

    const { displayState } = this.state;
    this.setState({
      displayState: displayState.set("detailClicked", false)
    });
  };

  render() {
    const isSidebarOpen = JSON.parse(localStorage.getItem("isSidebarOpen") || "true");
    const { brand, series, model, detail, grade, option } = this.state.currentItem.toObject();
    const { brandList, seriesList, modelList, detailList, gradeList, optionList } = this.state.currentList.toObject();
    const { price, optionPrice, totalPrice } = this.state.currentPrice.toObject();
    const { capitalList } = this.state;
    const { rentalPeriod, insurancePlan, deposit, advancePay } = this.state.currentTerms.toObject();
    const { listClicked, detailClicked } = this.state.displayState.toObject();
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
                {brandList.map((v: IBrand) => (
                  <li className="list-group-item" key={v.car_brand}>
                    <input
                      type="radio"
                      id={v.car_brand}
                      data-id={v.car_brand_id}
                      value={v.car_brand}
                      checked={brand === v.car_brand}
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
                {seriesList.map((v: ISeries) => (
                  <li className="list-group-item" key={v.car_series}>
                    <input
                      type="radio"
                      id={v.car_series}
                      data-id={v.car_series_id}
                      value={v.car_series}
                      checked={series === v.car_series}
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
                {modelList.map((v: IModel) => (
                  <li className="list-group-item" key={v.car_model}>
                    <input
                      type="radio"
                      id={v.car_model}
                      data-id={v.car_model_id}
                      value={v.car_model}
                      checked={model === v.car_model}
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
                {detailList.map((v: IDetail) => (
                  <li className="list-group-item" key={v.car_detail}>
                    <input
                      type="radio"
                      id={v.car_detail}
                      data-id={v.car_detail_id}
                      value={v.car_detail}
                      checked={detail === v.car_detail}
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
                {gradeList.map((v: IGrade) => (
                  <li className="list-group-item" key={v.car_grade}>
                    <input
                      type="radio"
                      id={v.car_grade}
                      data-id={v.car_grade_id}
                      value={v.car_grade}
                      checked={grade === v.car_grade}
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
                {optionList.map((v: IOption) => (
                  <li className="list-group-item apply_display_flex_sb" key={v.car_option}>
                    <input
                      type="radio"
                      id={v.car_option}
                      data-id={v.car_option_id}
                      value={v.car_option}
                      checked={option === v.car_option}
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
                  <select id="rentalPeriod" value={rentalPeriod} onChange={this.handleSelectNumber} required>
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
                  <select id="insurancePlan" value={insurancePlan} onChange={this.handleSelectString} required>
                    <option hidden>선택</option>
                    <option value="21세 이상">21세 이상</option>
                    <option value="26세 이상">26세 이상</option>
                  </select>
                </li>
                <li className="list-group-item apply_display_flex_sb">
                  <label htmlFor="deposit">보증금</label>
                  <select id="deposit" value={deposit} onChange={this.handleSelectNumber} required>
                    <option hidden>선택</option>
                    <option value="0">0%</option>
                    <option value="0.1">10%</option>
                    <option value="0.2">20%</option>
                    <option value="0.3">30%</option>
                  </select>
                </li>
                <li className="list-group-item apply_display_flex_sb">
                  <label htmlFor="advancePay">선납금</label>
                  <select id="advancePay" value={advancePay} onChange={this.handleSelectNumber} required>
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
              listClicked={listClicked}
              handleModal={this.handleModal}
            />
          </div>

          <div id="my-modal" className={detailClicked ? "show-my-modal" : "display-none"}>
            <Modal handleSave={this.handleSave} rentalData={this.state} detailClicked={detailClicked} />
          </div>
        </div>
      </div>
    );
  }
}
