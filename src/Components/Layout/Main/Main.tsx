import * as React from "react";
import { Home, RegisterForm, LoginForm, EditForm, RegisterTerms } from "../../Content";
import "./Main.css";

interface IProps {
  clicked: string;
  mainToggle: string;
  isSignedIn: boolean;
  handleLogin: (result: boolean) => void;
  handleLogout: () => void;
  handleClick: (comp: string) => void;
}

class Main extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { mainToggle } = this.props;
    return (
      <div className={`my-main ${mainToggle}`}>
        {this.props.clicked === "Home" && <Home />}
        {this.props.clicked === "Login" && !this.props.isSignedIn && (
          <LoginForm handleLogin={this.props.handleLogin} handleClick={this.props.handleClick} />
        )}
        {this.props.clicked === "AfterAuth" && <Home />}
        {this.props.clicked === "Register" && !this.props.isSignedIn && (
          <RegisterTerms handleClick={this.props.handleClick} />
        )}
        {this.props.clicked === "RegisterForm" && !this.props.isSignedIn && (
          <RegisterForm handleClick={this.props.handleClick} />
        )}
        {this.props.clicked === "Edit" && this.props.isSignedIn && (
          <EditForm handleClick={this.props.handleClick} handleLogout={this.props.handleLogout} />
        )}
        {this.props.clicked === "AfterEdit" && this.props.isSignedIn && <Home />}
      </div>
    );
  }
}

export default Main;
