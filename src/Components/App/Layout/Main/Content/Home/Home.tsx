/**
 * 홈 화면 백그라운드 이미지가 렌더링 되는 컴포넌트
 */

import * as React from "react";
import { IHomeProps } from "./IHome";
import background from "./assets/img/slider1.jpg";
import bottom1 from "./assets/img/main_quick1.jpg";
import bottom2 from "./assets/img/main_quick2.jpg";

export default class Home extends React.Component<IHomeProps> {
  constructor(props: IHomeProps) {
    super(props);
  }

  render() {
    const { mainToggle } = this.props;

    return (
      <div className={`my-main ${mainToggle}`}>
        <img className="background" src={background} />
        <img className="background-bottom" src={bottom1} />
        <img className="background-bottom" src={bottom2} />
      </div>
    );
  }
}
