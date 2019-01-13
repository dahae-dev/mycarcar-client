import "./EstimateListMain.css";

import React, { Component } from "react";

interface IEstimateListMainProps {}

interface IEstimateListMainStates {}

export default class EstimateListMain extends Component<IEstimateListMainProps, IEstimateListMainStates> {
  render() {
    return (
      <div className="estimate_list_main">
        <div className="estimate">
          <div className="estimated_date">견적일자 : 2019 / 01 / 13</div>

          <h1>견적서</h1>

          <hr />

          <div>
            <div className="estimate_infomation_title">
              <i className="fa fa-check-square-o" />
              <span>고객 정보</span>
            </div>
            <div className="estimate_info_label_contents">
              <div className="estimate_client_infomation1">
                <div className="estimate_label">이름</div>
                <div className="estimate_info_content">홍길동</div>
              </div>
              <div className="estimate_client_infomation1">
                <div className="estimate_label">연락처</div>
                <div className="estimate_info_content">010-0000-0000</div>
              </div>
              <div className="estimate_client_infomation1">
                <div className="estimate_label">이메일</div>
                <div className="estimate_info_content">gildong@codestates.com</div>
              </div>
            </div>
          </div>

          <hr />

          <div>
            <div className="estimate_infomation_title">
              <i className="fa fa-check-square-o" />
              <span>차량 정보</span>
            </div>
            <div className="estimate_info_label_contents">
              <div className="estimate_client_infomation1">
                <div className="estimate_label">모델</div>
                <div className="estimate_info_content">스파크_1.0_가솔린_5인승_LS</div>
              </div>
              <div className="estimate_client_infomation1">
                <div className="estimate_label">옵션</div>
                <div className="estimate_info_content">오토(C-TECH)</div>
              </div>
            </div>
          </div>

          <hr />

          <div>
            <div className="estimate_infomation_title">
              <i className="fa fa-pencil-square-o" />
              <span>렌트 조건</span>
            </div>
            <div className="estimate_info_label_contents">
              <div className="estimate_client_infomation1">
                <div className="estimate_label">렌트종류</div>
                <div className="estimate_info_content">BNK캐피탈</div>
              </div>
              <div className="estimate_client_infomation1">
                <div className="estimate_label">기간</div>
                <div className="estimate_info_content">36개월</div>
              </div>
              <div className="estimate_client_infomation1">
                <div className="estimate_label">약정거리</div>
                <div className="estimate_info_content">2만km/년</div>
              </div>
              <div className="estimate_client_infomation1">
                <div className="estimate_label">만기처리</div>
                <div className="estimate_info_content">36개월</div>
              </div>
              <div className="estimate_client_infomation1">
                <div className="estimate_label">보험담보</div>
                <div className="estimate_info_content">26세</div>
              </div>
            </div>
          </div>

          <hr />

          <div>
            <div className="estimate_infomation_title">
              <i className="fa fa-cab" />
              <span>차량가격</span>
            </div>
            <div className="estimate_info_label_contents">
              <div className="estimate_client_infomation2">
                <div className="estimate_label">기본가격</div>
                <div className="estimate_info_content">_</div>
                <div className="estimate_info_content">10,570,000원</div>
              </div>
              <div className="estimate_client_infomation2">
                <div className="estimate_label">옵션</div>
                <div className="estimate_info_content">오토(C-TECH) 래더 패키지 버튼 시동</div>
                <div className="estimate_info_content">1,800,000원</div>
              </div>
              <div className="estimate_client_infomation2">
                <div className="estimate_label">최종가격</div>
                <div className="estimate_info_content">_</div>
                <div className="estimate_info_content">13,300,000원</div>
              </div>
            </div>
          </div>

          <hr />

          <div>
            <div className="estimate_infomation_title">
              <i className="fa fa-calculator" />
              <span>렌트료 계산</span>
            </div>
            <div className="estimate_client_infomation2">
              <div className="estimate_label">보증금</div>
              <div className="estimate_info_content">10%</div>
              <div className="estimate_info_content">1,330,000원</div>
            </div>
            <div className="estimate_client_infomation2">
              <div className="estimate_label">선납급</div>
              <div className="estimate_info_content">10%</div>
              <div className="estimate_info_content">1,330,000원</div>
            </div>

            <div className="estimate_client_infomation2">
              <div className="estimate_label">추가용품</div>
              <div className="estimate_info_content">선택안함</div>
              <div className="estimate_info_content">0원</div>
            </div>

            <div className="estimate_client_infomation2">
              <div className="estimate_label">초기부담금</div>
              <div className="estimate_info_content">_</div>
              <div className="estimate_info_content">2,660,000원</div>
            </div>

            <div className="estimate_client_infomation2">
              <div className="estimate_label">월 렌트료</div>
              <div className="estimate_info_content">_</div>
              <div className="estimate_info_content">0원</div>
            </div>
          </div>

          <hr />

          <div>
            <div className="estimate_infomation_title">
              <i className="fa fa-check-square-o" />
              <span>필요서류</span>
            </div>
            <div className="estimate_client_infomation1">
              <div className="estimate_label">개인</div>
              <div className="estimate_info_content">
                주민등록등본 1통 / 인감증면서 2통 / 재산세과세증명서 1통 / 종합소득세 납부증명원 1부 / 자동이체통장 사본
                / 개인사업자등록증 사본 / 신분증 사본 / 자격증 사본 / 부과세과세증명서 1통 / 재직증명서 1부 /
                원청징수영수증 / 인감도장
              </div>
            </div>

            <div className="estimate_client_infomation1">
              <div className="estimate_label">법인</div>
              <div className="estimate_info_content">
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
