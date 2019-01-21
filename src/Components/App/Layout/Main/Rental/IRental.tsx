import { Record, List } from "immutable";

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

export interface ICurrentItem {
  origin: string;
  brand: string;
  series: string;
  model: string;
  detail: string;
  grade: string;
  option: string;
}

export interface ICurrentList {
  brandList: IBrand[];
  seriesList: ISeries[];
  modelList: IModel[];
  detailList: IDetail[];
  gradeList: IGrade[];
  optionList: IOption[];
}

export interface ICurrentPrice {
  price: number;
  optionPrice: number;
  totalPrice: number;
}

export interface ICurrentTerms {
  rentalPeriod: number;
  insurancePlan: string;
  deposit: number;
  advancePay: number;
}

export interface ICapitalList {
  capital_id: number;
  capital_name: string;
  capital_profit: number;
}

export interface ICurrentCapital {
  capital: string;
  profit: number;
}

export interface IDisplayState {
  listClicked: boolean;
  detailClicked: boolean;
}

export interface IRentalStates {
  currentItem: Record<ICurrentItem>;
  currentList: Record<ICurrentList>;
  currentPrice: Record<ICurrentPrice>;
  currentTerms: Record<ICurrentTerms>;
  capitalList: List<ICapitalList>;
  currentCapital: Record<ICurrentCapital>;
  displayState: Record<IDisplayState>;
  error: string;
}

export interface IDefaultValue {
  none: string;
  series: string;
  model: string;
  detail: string;
  grade: string;
  option: string;
  [key: string]: string;
}
