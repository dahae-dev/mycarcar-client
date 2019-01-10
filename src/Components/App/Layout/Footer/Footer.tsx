/**
 * 1주차 다해 - 레이아웃 최하단 Footer 컴포넌트, 사이드바 토글에 따라 사이즈 조절되는 부분 외에는 특이사항 없음
 */

import "./Footer.css";
import React from "react";

interface IFooterProps {
  isSidebarOpen: boolean;
}

export default class Footer extends React.Component<IFooterProps> {
  constructor(props: IFooterProps) {
    super(props);
  }

  render() {
    return (
      <div id="my-footer" className={this.props.isSidebarOpen ? "" : "my-footer-margin-left"}>
        <div id="ft-copy">
          Copyright &copy; <b>mycarcar.com</b> All rights reserved.
        </div>
      </div>
    );
  }
}
