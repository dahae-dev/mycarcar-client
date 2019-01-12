/**
 * 3주차 다해 - 장기렌트 page에서 캐피탈사별 견적서를 보여주는 모달 컴포넌트
 */

import * as React from "react";
import "./Modal.css";

import { IRentalStates } from "../Rental";

interface IModalProps {
  rentalData: IRentalStates;
  handleSave: () => void;
}

export default class Modal extends React.Component<IModalProps> {
  constructor(props: IModalProps) {
    super(props);
  }

  public render() {
    const {
      brand,
      model,
      detail,
      grade,
      option,
      capital,
      profit,
      rentalPeriod,
      insurancePlan,
      totalPrice,
      deposit,
      advancePay
    } = this.props.rentalData;

    const finalRent = totalPrice * (1 + profit / 100) + insurancePlan;
    const depositPercentage = deposit * 100;
    const depositPrice = finalRent * deposit;
    const advancePayPercentage = advancePay * 100;
    const advancePayPrice = finalRent * advancePay;
    const initialPrice = depositPrice + advancePayPrice;
    const monthlyRent = (finalRent - initialPrice) / rentalPeriod;

    return (
      <div className="capital-modal">
        <h2>예 상 견 적 서</h2>
        <div className="capital-table-container">
          <div className="capital-table-form">
            <div className="capital-table-title">
              <i className="fa fa-check-square-o" />
              차량정보
            </div>
            <div className="capital-table">
              <div className="capital-table-head">
                <div>모델명</div>
                <div>상세모델</div>
                <div>옵션</div>
              </div>
              <div className="capital-table-content">
                <div>{`${brand} ${model}`}</div>
                <div>{`${detail} ${grade}`}</div>
                <div>{option}</div>
              </div>
            </div>
          </div>
          <div className="capital-table-form">
            <div className="capital-table-title">
              <i className="fa fa-check-square-o" />
              렌탈조건
            </div>
            <div className="capital-table">
              <div className="capital-table-head">
                <div>캐피탈사</div>
                <div>렌탈기간</div>
                <div>보험담보</div>
                <div>렌탈가격</div>
              </div>
              <div className="capital-table-content">
                <div>{capital}</div>
                <div>{`${rentalPeriod}개월`}</div>
                <div>{insurancePlan === 600000 ? "26세 이상" : "21세 이상"}</div>
                <div>{`${finalRent.toLocaleString()}원`}</div>
              </div>
            </div>
          </div>
          <div className="capital-table-form">
            <div className="capital-table-title">
              <i className="fa fa-calculator" />
              렌탈료 계산
            </div>
            <div className="capital-table">
              <div className="capital-table-head">
                <div>보증금 (1)</div>
                <div>선납금 (2)</div>
                <div>초기부담금 (1+2)</div>
                <div>월 렌탈료</div>
              </div>
              <div className="capital-table-content">
                <div>{`(${depositPercentage}%) ${depositPrice.toLocaleString()}원`}</div>
                <div>{`(${advancePayPercentage}%) ${advancePayPrice.toLocaleString()}원`}</div>
                <div>{`${initialPrice.toLocaleString()}원`}</div>
                <div>{`${monthlyRent.toLocaleString()}원`}</div>
              </div>
            </div>
          </div>
          <div className="btn-container">
            <input type="button" value="견적서 저장" onClick={this.props.handleSave} />
          </div>
        </div>
      </div>
    );
  }
}
