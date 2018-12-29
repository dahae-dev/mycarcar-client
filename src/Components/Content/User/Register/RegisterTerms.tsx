import * as React from "react";
import axios from "axios";
import logo from "../../../../assets/img/logo_basic.png";
import "./RegisterTerms.css";
import * as termsContent from "./terms";

interface ITermsProps {
  handleClick: (comp: string) => void;
}

interface ITermsState {
  isCheckedFst: boolean;
  isCheckedSnd: boolean;
}

class RegisterTerms extends React.Component<ITermsProps, ITermsState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isCheckedFst: false,
      isCheckedSnd: false
    };

    this.handleChangeFst = this.handleChangeFst.bind(this);
    this.handleChangeSnd = this.handleChangeSnd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeFst(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ isCheckedFst: e.currentTarget.checked });
  }

  handleChangeSnd(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ isCheckedSnd: e.currentTarget.checked });
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!this.state.isCheckedFst || !this.state.isCheckedSnd) {
      alert("회원가입약관 및 개인정보처리방침에 동의해야 회원가입이 가능합니다.");
      return;
    }
    this.props.handleClick("RegisterForm");
  }

  render() {
    const { terms, privatePolicy } = termsContent;

    return (
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
                  회원가입약관의 내용에 동의합니다.
                  <input type="checkbox" onChange={this.handleChangeFst} />
                </label>
              </div>
              <div className="terms-container bottom-container">
                개인정보처리방침안내
                <textarea value={privatePolicy} rows={6} cols={54} disabled />
                <label className="checkbox-container">
                  개인정보처리방침안내의 내용에 동의합니다.
                  <input type="checkbox" onChange={this.handleChangeSnd} />
                </label>
              </div>
              <input type="submit" id="btn-next" value="NEXT" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterTerms;
