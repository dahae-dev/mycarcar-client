/**
 * 3주차 다해 - 장기렌트 page에서 견적확인 시 캐피탈사별 견적 리스트를 보여주는 컴포넌트
 */

import React, { MouseEvent } from "react";
import "./Capital.css";

import { ICapitalList } from "../Rental";

interface ICapitalProps {
  totalPrice: number;
  capitalList: ICapitalList[];
  rentalPeriod: number;
  insurancePlan: string;
  deposit: number;
  advancePay: number;
  handleModal: (e: MouseEvent<HTMLInputElement>) => void;
}

export default class Capital extends React.Component<ICapitalProps> {
  constructor(props: ICapitalProps) {
    super(props);
  }

  public render() {
    const { totalPrice, capitalList, rentalPeriod, insurancePlan, deposit, advancePay } = this.props;
    const insurancePrice = insurancePlan === "21세 이상" ? 1000000 : 600000;

    return (
      <div className="capital-list">
        <div className="capital-list-head">
          <div>캐피탈사</div>
          <div>총 렌탈 금액</div>
          <div>월 렌탈료</div>
          <div>견적서 보기</div>
        </div>
        {capitalList
          .map((capital) => {
            const randomProfit = (Math.random() * 0.01 + 0.02).toString();
            const profit = Number(Number.parseFloat(randomProfit).toFixed(3)) * 100;
            return { name: capital.capital_name, profit };
          })
          .sort((a, b) => (a.profit > b.profit ? 1 : b.profit > a.profit ? -1 : 0))
          .map((capital) => {
            const finalRent = totalPrice * (1 + capital.profit / 100) + insurancePrice;
            const monthlyRend = (finalRent - (finalRent * deposit + finalRent * advancePay)) / rentalPeriod;
            return (
              <div className="capital-list-content" key={capital.name}>
                <div>{capital.name}</div>
                <div>{`${Math.floor(finalRent).toLocaleString()}원`}</div>
                <div>{`${Math.floor(monthlyRend).toLocaleString()}원`}</div>
                <div>
                  <input
                    type="button"
                    value="보기"
                    data-capital={capital.name}
                    data-profit={capital.profit}
                    onClick={this.props.handleModal}
                  />
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}
