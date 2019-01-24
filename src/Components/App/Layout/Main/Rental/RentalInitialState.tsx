import { Record, List } from "immutable";
import { IDefaultValue } from "./IRental";

export const DEFAULT_VALUE: IDefaultValue = {
  none: "정보없음",
  series: "제조사를 선택해주세요.",
  model: "시리즈를 선택해주세요.",
  detail: "모델을 선택해주세요.",
  grade: "상세모델을 선택해주세요.",
  option: "등급을 선택해주세요."
};

export const CurrentItem = Record({
  origin: "korea",
  brand: "",
  series: "",
  model: "",
  detail: "",
  grade: "",
  option: ""
});

export const CurrentList = Record({
  brandList: [{ car_brand_id: -1, car_brand: "" }],
  seriesList: [{ car_series_id: -1, car_series: DEFAULT_VALUE.series }],
  modelList: [{ car_model_id: -1, car_model: DEFAULT_VALUE.model }],
  detailList: [{ car_detail_id: -1, car_detail: DEFAULT_VALUE.detail }],
  gradeList: [{ car_grade_id: -1, car_grade: DEFAULT_VALUE.grade }],
  optionList: [{ car_option_id: -1, car_option: DEFAULT_VALUE.option, car_option_price: 0 }]
});

export const CurrentPrice = Record({
  price: 0,
  optionPrice: 0,
  totalPrice: 0
});

export const CurrentTerms = Record({
  rentalPeriod: 0,
  insurancePlan: "",
  deposit: 0,
  advancePay: 0
});

export const CapitalList = List();

export const CurrentCapital = Record({
  capital: "",
  profit: 0
});

export const DisplayState = Record({
  listClicked: false,
  detailClicked: false,
  saveClicked: false
});

export const DEFAULT_RENTAL_STATE = {
  currentItem: CurrentItem(),
  currentList: CurrentList(),
  currentPrice: CurrentPrice(),
  currentTerms: CurrentTerms(),
  capitalList: CapitalList,
  currentCapital: CurrentCapital(),
  displayState: DisplayState(),
  error: ""
};
