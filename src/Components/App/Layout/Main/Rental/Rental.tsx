import "./Rental.css";

import React, { Component, MouseEvent } from "react";
import axios from "axios";

import Origin from "./Origin/Origin";

interface IRentalProps {}

interface IBrand {
  car_brand: string;
}

interface ISeries {
  car_series: string;
}

interface IModel {
  car_model: string;
}

interface IDetail {
  car_detail: string;
}

interface IGrade {
  car_grade: string;
}

interface IOption {
  car_option: string;
}

interface IRentalStates {
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

export default class Rental extends Component<IRentalProps, IRentalStates> {
  constructor(props: IRentalProps) {
    super(props);

    this.state = {
      origin: "korea",

      brand: "",
      brandList: [{ car_brand: "" }],

      series: "",
      seriesList: [{ car_series: "" }],

      model: "",
      modelList: [{ car_model: "" }],

      detail: "",
      detailList: [{ car_detail: "" }],

      grade: "",
      gradeList: [{ car_grade: "" }],

      option: "",
      optionList: [{ car_option: "" }],
    };

    this.handleOriginClick = this.handleOriginClick.bind(this);
    this.handleBrandClick = this.handleBrandClick.bind(this);
    this.handleSeriesClick = this.handleSeriesClick.bind(this);
    this.handleModelClick = this.handleModelClick.bind(this);
    this.handleDetailClick = this.handleDetailClick.bind(this);
    this.handleGradeClick = this.handleGradeClick.bind(this);
  }

  handleOriginClick(origin: string) {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/rental/${origin}`)
      .then(res => {
        const brandList: IBrand[] = res.data.brandList;
        this.setState({
          brandList,
          origin,
          seriesList: [{ car_series: "" }],
          modelList: [{ car_model: "" }],
          detailList: [{ car_detail: "" }],
          gradeList: [{ car_grade: "" }],
          optionList: [{ car_option: "" }],
        });
      })
      .catch((err: Error) => {
        alert(err.message);
      });
  }

  handleBrandClick(e: MouseEvent) {
    const origin = this.state.origin;
    const brand = e.currentTarget.textContent || "";

    const encodedBrand = encodeURI(brand);

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/rental/${origin}/${encodedBrand}`)
      .then(res => {
        const seriesList: ISeries[] = res.data.seriesList;
        this.setState({
          seriesList,
          brand,
          modelList: [{ car_model: "" }],
          detailList: [{ car_detail: "" }],
          gradeList: [{ car_grade: "" }],
          optionList: [{ car_option: "" }],
        });
      })
      .catch((err: Error) => {
        alert(err.message);
      });
  }

  handleSeriesClick(e: MouseEvent) {
    const origin = this.state.origin;
    const brand = this.state.brand;
    const series = e.currentTarget.textContent || "";

    const encodedBrand = encodeURI(brand);
    const encodedSeries = encodeURI(series);

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/rental/${origin}/${encodedBrand}/${encodedSeries}`)
      .then(res => {
        const modelList: IModel[] = res.data.modelList;
        this.setState({
          modelList,
          series,
          detailList: [{ car_detail: "" }],
          gradeList: [{ car_grade: "" }],
          optionList: [{ car_option: "" }],
        });
      })
      .catch((err: Error) => {
        alert(err.message);
      });
  }

  handleModelClick(e: MouseEvent) {
    const origin = this.state.origin;
    const brand = this.state.brand;
    const series = this.state.series;
    const model = e.currentTarget.textContent || "";

    const encodedBrand = encodeURI(brand);
    const encodedSeries = encodeURI(series);
    const encodedModel = encodeURI(model);

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/rental/${origin}/${encodedBrand}/${encodedSeries}/${encodedModel}`)
      .then(res => {
        const detailList: IDetail[] = res.data.detailList;
        this.setState({
          detailList,
          model,
          gradeList: [{ car_grade: "" }],
          optionList: [{ car_option: "" }],
        });
      })
      .catch((err: Error) => {
        alert(err.message);
      });
  }

  handleDetailClick(e: MouseEvent) {
    const origin = this.state.origin;
    const brand = this.state.brand;
    const series = this.state.series;
    const model = this.state.model;
    const detail = e.currentTarget.textContent || "";

    const encodedBrand = encodeURI(brand);
    const encodedSeries = encodeURI(series);
    const encodedModel = encodeURI(model);
    const encodedDetail = encodeURI(detail);

    axios
      .get(
        `${
          process.env.REACT_APP_API_URL
        }/api/rental/${origin}/${encodedBrand}/${encodedSeries}/${encodedModel}/${encodedDetail}`,
      )
      .then(res => {
        const gradeList: IGrade[] = res.data.gradeList;
        this.setState({ gradeList, detail, optionList: [{ car_option: "" }] });
      })
      .catch((err: Error) => {
        alert(err.message);
      });
  }

  handleGradeClick(e: MouseEvent) {
    const origin = this.state.origin;
    const brand = this.state.brand;
    const series = this.state.series;
    const model = this.state.model;
    const detail = this.state.detail;
    const grade = e.currentTarget.textContent || "";

    const encodedBrand = encodeURI(brand);
    const encodedSeries = encodeURI(series);
    const encodedModel = encodeURI(model);
    const encodedDetail = encodeURI(detail);
    const encodedGrade = encodeURI(grade);

    axios
      .get(
        `${
          process.env.REACT_APP_API_URL
        }/api/rental/${origin}/${encodedBrand}/${encodedSeries}/${encodedModel}/${encodedDetail}/${encodedGrade}`,
      )
      .then(res => {
        const optionList: IOption[] = res.data.optionList;
        this.setState({ optionList, grade });
      })
      .catch((err: Error) => {
        alert(err.message);
      });
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/rental/korea`)
      .then(res => {
        const brandList: IBrand[] = res.data.brandList;
        this.setState({ brandList });
      })
      .catch((err: Error) => {
        alert(err.message);
      });
  }

  render() {
    return (
      <div className="rental">
        <h1>
          <i className="fa fa-list-ol">step1</i>
        </h1>
        <div className="select_car">
          <div>
            <div>
              제조사
              <Origin handleOriginClick={this.handleOriginClick} />
            </div>
            <ul className="list_group list-group">
              {this.state.brandList.map(v => (
                <li className="list-group-item" onClick={this.handleBrandClick} key={v.car_brand}>
                  {v.car_brand}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div>시리즈</div>
            <ul className="list_group list-group">
              {this.state.seriesList.map(v => (
                <li className="list-group-item" onClick={this.handleSeriesClick} key={v.car_series}>
                  {v.car_series}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div>모델명</div>
            <ul className="list_group list-group">
              {this.state.modelList.map(v => (
                <li className="list-group-item" onClick={this.handleModelClick} key={v.car_model}>
                  {v.car_model}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div>상세모델</div>
            <ul className="list_group list-group">
              {this.state.detailList.map(v => (
                <li className="list-group-item" onClick={this.handleDetailClick} key={v.car_detail}>
                  {v.car_detail}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div>등급</div>
            <ul className="list_group list-group">
              {this.state.gradeList.map(v => (
                <li className="list-group-item" onClick={this.handleGradeClick} key={v.car_grade}>
                  {v.car_grade}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div>옵션</div>
            <ul className="list_group list-group">
              {this.state.optionList.map(v => (
                <li className="list-group-item" key={v.car_option}>
                  {v.car_option}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div>차량가격 : </div>
            <div>옵션가격 : </div>
            <div>최종가격 : </div>
          </div>
        </div>
      </div>
    );
  }
}
