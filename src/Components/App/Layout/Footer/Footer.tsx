import * as React from "react";
import { IFooterProps } from "./IFooter";
import "./Footer.css";

export default class Footer extends React.Component<IFooterProps, {}> {
  constructor(props: IFooterProps) {
    super(props);
  }

  render() {
    const { footerToggle } = this.props;
    return (
      <div className={`my-footer ${footerToggle}`}>
        <div id="ft-copy">
          Copyright &copy; <b>mycarcar.com</b> All rights reserved.
        </div>
      </div>
    );
  }
}
