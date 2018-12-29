import * as React from "react";
import { Home, RegisterForm, LoginForm, EditForm, RegisterTerms } from "../../Content";
import "./Main.css";

interface IProps {
  currentState: string;
  mainToggle: string;
  isSignedIn: boolean;
  handleLogin: (result: boolean) => void;
  handleLogout: () => void;
  handleState: (changedState: string) => void;
}

class Main extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { mainToggle } = this.props;
    return (
      <div className={`my-main ${mainToggle}`}>
        {this.props.currentState === "Home" && <Home />}
        {this.props.currentState === "Login" && !this.props.isSignedIn && (
          <LoginForm handleLogin={this.props.handleLogin} handleState={this.props.handleState} />
        )}
        {this.props.currentState === "AfterAuth" && <Home />}
        {this.props.currentState === "Register" && !this.props.isSignedIn && (
          <RegisterTerms handleState={this.props.handleState} />
        )}
        {this.props.currentState === "RegisterForm" && !this.props.isSignedIn && (
          <RegisterForm handleState={this.props.handleState} />
        )}
        {this.props.currentState === "Edit" && this.props.isSignedIn && (
          <EditForm handleState={this.props.handleState} handleLogout={this.props.handleLogout} />
        )}
        {this.props.currentState === "AfterEdit" && this.props.isSignedIn && <Home />}
      </div>
    );
  }
}

export default Main;
