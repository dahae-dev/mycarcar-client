/**
 * 1주차 다해 - 회원가입 이용약관 컴포넌트
 */

import "./RegisterTerms.css";

import React from "react";

import logo from "assets/img/logo_basic.png";

import * as termsContent from "../../../../../util/Terms/terms";

interface IRegisterTermsProps {
  isOpen: boolean;

  handlePage: (pathname: string) => void;
}

interface IRegisterTermsState {
  isCheckedFst: boolean;
  isCheckedSnd: boolean;
}

export default class RegisterTerms extends React.Component<IRegisterTermsProps, IRegisterTermsState> {
  constructor(props: IRegisterTermsProps) {
    super(props);

    this.state = {
      isCheckedFst: false,
      isCheckedSnd: false,
    };

    this.handleChangeFst = this.handleChangeFst.bind(this);
    this.handleChangeSnd = this.handleChangeSnd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // 각 이용약관 체크박스 동의 체크 여부 확인
  handleChangeFst(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ isCheckedFst: e.currentTarget.checked });
  }
  handleChangeSnd(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ isCheckedSnd: e.currentTarget.checked });
  }

  // 이용약관 동의 여부 확인 후 회원가입 양식으로 이동
  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!this.state.isCheckedFst || !this.state.isCheckedSnd) {
      alert("회원가입약관 및 개인정보처리방침에 동의해야 회원가입이 가능합니다.");
      return;
    }
    this.props.handlePage("/register");
  }

  render() {
    const { terms, privatePolicy } = termsContent;

    return (
      <div id="my-main" className={this.props.isOpen ? "" : "my-main-margin-left"}>
        <div className="terms-form-container">
          <div>
            <div className="terms-logo">
              <img src={logo} />
            </div>
            <div className="terms-form-box">
              <div className="terms-title">
                <i className="fa fa-sign-in" />
                회원가입약관
              </div>
              <hr />
              <form className="terms-form-input" method="post" onSubmit={this.handleSubmit}>
                <div className="terms-container">
                  회원가입약관
                  <textarea value={terms} rows={6} cols={54} disabled />
                  <label className="checkbox-container">
                    회원가입약관의 내용에 동의합니다
                    <input type="checkbox" onChange={this.handleChangeFst} />
                  </label>
                </div>
                <div className="terms-container bottom-container">
                  개인정보처리방침안내
                  <textarea value={privatePolicy} rows={6} cols={54} disabled />
                  <label className="checkbox-container">
                    개인정보처리방침안내의 내용에 동의합니다
                    <input type="checkbox" onChange={this.handleChangeSnd} />
                  </label>
                </div>
                <input type="submit" id="btn-next" value="NEXT" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
