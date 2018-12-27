import * as React from "react";
import { Home, RegisterForm, LoginForm } from "../../Content";
import "./Main.css";

interface IProps {
  clicked: string;
}

class Main extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className="my-main">
        {this.props.clicked === "Home" && <Home />}
        {this.props.clicked === "Login" && <LoginForm />}
        {this.props.clicked === "Register" && <RegisterForm />}
      </div>
    );
  }
}

export default Main;
