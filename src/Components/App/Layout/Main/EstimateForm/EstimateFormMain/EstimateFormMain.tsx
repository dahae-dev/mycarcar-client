import "./EstimateFormMain.css";

import React, { Component } from "react";

interface IEstimateInfo {
  at_date: string;
  capital: string;
  car_advance_pay: number;
  car_brand: string;
  car_deposit: number;
  car_detail: string;
  car_estimate_no: number;
  car_final_price: number;
  car_grade: string;
  car_insurance_plan: number;
  car_model: string;
  car_option: string;
  car_option_price: number;
  car_origin: string;
  car_price: number;
  car_rental_period: number;
  car_series: string;
  mb_email: string;
  mb_id: string;
  mb_name: string;
  mb_phone: string;
}

export default class EstimateFormMain extends Component {
  render() {
    const estimateInfo: IEstimateInfo = JSON.parse(
      sessionStorage.getItem("estimateInfo") ||
        `
      {
        "at_date": ""
        "capital": ""
        "car_advance_pay": 0
        "car_brand": ""
        "car_deposit": 0
        "car_detail": ""
        "car_estimate_no": 0
        "car_final_price": 0
        "car_grade": ""
        "car_insurance_plan": 0
        "car_model": ""
        "car_option": ""
        "car_option_price": 0
        "car_origin": ""
        "car_price": 0
        "car_rental_period": 0
        "car_series": ""
        "mb_email": ""
        "mb_id": ""
        "mb_name": ""
        "mb_phone": ""
      }`
    );
    const carModel = `${estimateInfo.car_brand} ${estimateInfo.car_series} ${estimateInfo.car_model} ${
      estimateInfo.car_detail
    } ${estimateInfo.car_grade}`;

    const atDate = new Date(estimateInfo.at_date);
    const parseDate = `${atDate.getFullYear()} / ${atDate.getMonth() + 1} / ${atDate.getDate()}`;

    return (
      <div className="estimate_form_main">
        <div className="estimate_form">
          <div className="estimated_date">견적일자 : {parseDate}</div>

          <h1>견적서</h1>

          <hr />

          <div>
            <div className="estimate_form_infomation_title">
              <i className="fa fa-check-square-o" />
              <span>고객 정보</span>
            </div>
            <div className="estimate_form_info_label_contents">
              <div className="estimate_form_client_infomation1">
                <div className="estimate_form_label">이름</div>
                <div className="estimate_form_info_content">{estimateInfo.mb_name}</div>
              </div>
              <div className="estimate_form_client_infomation1">
                <div className="estimate_form_label">연락처</div>
                <div className="estimate_form_info_content">{estimateInfo.mb_phone}</div>
              </div>
              <div className="estimate_form_client_infomation1">
                <div className="estimate_form_label">이메일</div>
                <div className="estimate_form_info_content">{estimateInfo.mb_email}</div>
              </div>
            </div>
          </div>

          <hr />

          <div>
            <div className="estimate_form_infomation_title">
              <i className="fa fa-check-square-o" />
              <span>차량 정보</span>
            </div>
            <div className="estimate_form_info_label_contents">
              <div className="estimate_form_client_infomation1">
                <div className="estimate_form_label">모델</div>
                <div className="estimate_form_info_content">{carModel}</div>
              </div>
              <div className="estimate_form_client_infomation1">
                <div className="estimate_form_label">옵션</div>
                <div className="estimate_form_info_content">{estimateInfo.car_option}</div>
              </div>
            </div>
          </div>

          <hr />

          <div>
            <div className="estimate_form_infomation_title">
              <i className="fa fa-pencil-square-o" />
              <span>렌트 조건</span>
            </div>
            <div className="estimate_form_info_label_contents">
              <div className="estimate_form_client_infomation1">
                <div className="estimate_form_label">업체명</div>
                <div className="estimate_form_info_content">{estimateInfo.capital}</div>
              </div>
              <div className="estimate_form_client_infomation1">
                <div className="estimate_form_label">기간</div>
                <div className="estimate_form_info_content">
                  {estimateInfo.car_rental_period}
                  개월
                </div>
              </div>
            </div>
          </div>

          <hr />

          <div>
            <div className="estimate_form_infomation_title">
              <i className="fa fa-cab" />
              <span>차량가격</span>
            </div>
            <div className="estimate_form_info_label_contents">
              <div className="estimate_form_client_infomation2">
                <div className="estimate_form_label">기본가격</div>
                <div className="estimate_form_info_content">{}</div>
                <div className="estimate_form_info_content">{estimateInfo.car_price.toLocaleString()}원</div>
              </div>
              <div className="estimate_form_client_infomation2">
                <div className="estimate_form_label">옵션</div>
                <div className="estimate_form_info_content">{estimateInfo.car_option}</div>
                <div className="estimate_form_info_content">{estimateInfo.car_option_price.toLocaleString()}원</div>
              </div>
              <div className="estimate_form_client_infomation2">
                <div className="estimate_form_label">최종가격</div>
                <div className="estimate_form_info_content">{}</div>
                <div className="estimate_form_info_content">{estimateInfo.car_final_price.toLocaleString()}원</div>
              </div>
            </div>
          </div>

          <hr />

          <div>
            <div className="estimate_form_infomation_title">
              <i className="fa fa-calculator" />
              <span>렌트료 계산</span>
            </div>
            <div className="estimate_form_client_infomation2">
              <div className="estimate_form_label">보증금</div>
              <div className="estimate_form_info_content">{estimateInfo.car_deposit}%</div>
              <div className="estimate_form_info_content">
                {(estimateInfo.car_final_price * estimateInfo.car_deposit).toLocaleString()}원
              </div>
            </div>
            <div className="estimate_form_client_infomation2">
              <div className="estimate_form_label">선납급</div>
              <div className="estimate_form_info_content">{estimateInfo.car_advance_pay}%</div>
              <div className="estimate_form_info_content">
                {(estimateInfo.car_final_price * estimateInfo.car_advance_pay).toLocaleString()}원
              </div>
            </div>

            <div className="estimate_form_client_infomation2">
              <div className="estimate_form_label">월 렌트료</div>
              <div className="estimate_form_info_content">
                {estimateInfo.car_rental_period}
                개월
              </div>
              <div className="estimate_form_info_content">
                {(estimateInfo.car_final_price / estimateInfo.car_rental_period).toLocaleString()}원
              </div>
            </div>
          </div>

          <hr />

          <div>
            <div className="estimate_form_infomation_title">
              <i className="fa fa-check-square-o" />
              <span>필요서류</span>
            </div>
            <div className="estimate_form_client_infomation1">
              <div className="estimate_form_label">개인</div>
              <div className="estimate_form_info_content">
                주민등록등본 1통 / 인감증면서 2통 / 재산세과세증명서 1통 / 종합소득세 납부증명원 1부 / 자동이체통장 사본
                / 개인사업자등록증 사본 / 신분증 사본 / 자격증 사본 / 부과세과세증명서 1통 / 재직증명서 1부 /
                원청징수영수증 / 인감도장
              </div>
            </div>

            <div className="estimate_form_client_infomation1">
              <div className="estimate_form_label">법인</div>
              <div className="estimate_form_info_content">
                법인등기부등본 1통 / 법인인감증명서 2통 / 법인사업자등록증 사본 / 최근년도재무제표 1부 / 법인
                자동이체통장 사본 / 대표이사 주민등록등본 1통 / 대표이사 인감증명서 2통 / 대표이사 재산세증명서 1통 /
                대표이사 신분증 사본 / 법인 주주명부 / 인감도장
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
