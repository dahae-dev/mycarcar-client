import { IRentalStates, ISelectMessages, IListState } from "./IRental";

export const selectMessages: ISelectMessages = {
  none: "정보없음",
  series: "제조사를 선택해주세요.",
  model: "시리즈를 선택해주세요.",
  detail: "모델을 선택해주세요.",
  grade: "상세모델을 선택해주세요.",
  option: "등급을 선택해주세요."
};

export const LIST_INITIAL_STATE: IListState = {
  brandList: [{ car_brand_id: -1, car_brand: "" }],
  seriesList: [{ car_series_id: -1, car_series: selectMessages.series }],
  modelList: [{ car_model_id: -1, car_model: selectMessages.model }],
  detailList: [{ car_detail_id: -1, car_detail: selectMessages.detail }],
  gradeList: [{ car_grade_id: -1, car_grade: selectMessages.grade }],
  optionList: [{ car_option_id: -1, car_option: selectMessages.option, car_option_price: 0 }]
};

const carInfoState = {
  origin: "korea",

  brand: "",
  // brandList: [{ car_brand_id: -1, car_brand: "" }],

  series: "",
  // seriesList: [{ car_series_id: -1, car_series: selectMessages.series }],

  model: "",
  // modelList: [{ car_model_id: -1, car_model: selectMessages.model }],

  detail: "",
  // detailList: [{ car_detail_id: -1, car_detail: selectMessages.detail }],

  grade: "",
  // gradeList: [{ car_grade_id: -1, car_grade: selectMessages.grade }],

  option: "",
  // optionList: [{ car_option_id: -1, car_option: selectMessages.option, car_option_price: 0 }]

  list: LIST_INITIAL_STATE
};

const priceInfoState = {
  price: 0,
  optionPrice: 0,
  totalPrice: 0
};

const rentalTermsState = {
  rentalPeriod: 0,
  insurancePlan: "",
  deposit: 0,
  advancePay: 0
};

const capitalInfoState = {
  capitalList: [],
  capital: "",
  profit: 0
};

const radioState = {
  checkedBrand: "",
  checkedSeries: "",
  checkedModel: "",
  checkedDetail: "",
  checkedGrade: "",
  checkedOption: ""
};

const displayState = {
  listClicked: false,
  detailClicked: false
};

export const RENTAL_INITIAL_STATE: IRentalStates = {
  carInfoState,
  priceInfoState,
  rentalTermsState,
  capitalInfoState,
  radioState,
  displayState,
  error: ""
};
