import * as React from "react";
import background from "../../../assets/img/slider1.jpg";
import bottom1 from "../../../assets/img/main_quick1.jpg";
import bottom2 from "../../../assets/img/main_quick2.jpg";

class Home extends React.Component {
  render() {
    return (
      <div>
        <img className="background" src={background} />
        <img className="background-bottom" src={bottom1} />
        <img className="background-bottom" src={bottom2} />
      </div>
    );
  }
}

export default Home;
