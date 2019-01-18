export interface IBrand {
  car_brand_id: number;
  car_brand: string;
}

export interface ISeries {
  car_series_id: number;
  car_series: string;
}

export interface IModel {
  car_model_id: number;
  car_model: string;
}

export interface IDetail {
  car_detail_id: number;
  car_detail: string;
}

export interface IGrade {
  car_grade_id: number;
  car_grade: string;
}

export interface IOption {
  car_option_id: number;
  car_option: string;
  car_option_price: number;
}

export interface ICapitalList {
  capital_id: number;
  capital_name: string;
  capital_profit: number;
}

export interface IListState {
  brandList: IBrand[];
  seriesList: ISeries[];
  modelList: IModel[];
  detailList: IDetail[];
  gradeList: IGrade[];
  optionList: IOption[];
}

interface ICarInfoState {
  origin: string;
  brand: string;
  series: string;
  model: string;
  detail: string;
  grade: string;
  option: string;
  list: IListState;
}

interface IPriceInfoState {
  price: number;
  optionPrice: number;
  totalPrice: number;
}

interface IRentalTermsState {
  rentalPeriod: number;
  insurancePlan: string;
  deposit: number;
  advancePay: number;
}

interface ICapitalInfoState {
  capitalList: ICapitalList[];
  capital: string;
  profit: number;
}

interface IDisplayState {
  listClicked: boolean;
  detailClicked: boolean;
}

export interface IRentalStates {
  carInfoState: ICarInfoState;
  priceInfoState: IPriceInfoState;
  rentalTermsState: IRentalTermsState;
  capitalInfoState: ICapitalInfoState;
  displayState: IDisplayState;
  error: string;
}

export interface ISelectMessages {
  none: string;
  series: string;
  model: string;
  detail: string;
  grade: string;
  option: string;
  [key: string]: string;
}

export interface IBrandListData {
  brandList: IBrand[];
}

export interface ISeriesListData {
  seriesList: ISeries[];
}

export interface IModelListData {
  modelList: IModel[];
}

export interface IDetailListData {
  detailList: IDetail[];
}

export interface IGradeListData {
  gradeList: IGrade[];
}

export interface IOptionListData {
  car_price: number;
  optionList: IOption[];
}

export interface ICapitalListData {
  capitalList: ICapitalList[];
}
