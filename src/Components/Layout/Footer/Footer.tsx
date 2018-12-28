import * as React from "react";
import "./Footer.css";

class Footer extends React.Component {
  render() {
    return (
      <div className="my-footer">
        <div id="ft-copy">
          Copyright &copy; <b>mycarcar.com</b> All rights reserved.
        </div>
      </div>
    );
  }
}

export default Footer;
