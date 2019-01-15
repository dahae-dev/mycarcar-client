export interface IBrand {
  car_brand: string;
}

export interface ISeries {
  car_series: string;
}

export interface IModel {
  car_model: string;
}

export interface IDetail {
  car_detail: string;
}

export interface IGrade {
  car_grade: string;
}

export interface IOption {
  car_option: string;
  car_option_price: number;
}

export interface ICapitalList {
  capital_id: number;
  capital_name: string;
  capital_profit: number;
}

interface ICarInfoState {
  origin: string;

  brand: string;
  brandList: IBrand[];

  series: string;
  seriesList: ISeries[];

  model: string;
  modelList: IModel[];

  detail: string;
  detailList: IDetail[];

  grade: string;
  gradeList: IGrade[];

  option: string;
  optionList: IOption[];
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

interface IRadioState {
  checkedBrand: string;
  checkedSeries: string;
  checkedModel: string;
  checkedDetail: string;
  checkedGrade: string;
  checkedOption: string;
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
  radioState: {
    [key: string]: string;
  };
  displayState: IDisplayState;
}

export interface ISelectMessages {
  [key: string]: string;
}
