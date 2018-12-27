import * as React from "react";
import { Header, SideBar, Main, Footer } from "./Layout";
import "./App.css";

interface IUserState {
  isSignedIn: boolean;
  clicked: string;
}

class App extends React.Component<{}, IUserState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isSignedIn: false,
      clicked: "Home"
    };

    this.clickLogin = this.clickLogin.bind(this);
    this.clickRegister = this.clickRegister.bind(this);
  }

  clickLogin() {
    this.setState({ clicked: "Login" });
  }

  clickLogout() {
    this.setState({ clicked: "Logout" });
  }

  clickRegister() {
    this.setState({ clicked: "Register" });
  }

  render() {
    return (
      <div className="grid-container">
        <Header />
        <SideBar
          isSignedIn={this.state.isSignedIn}
          handleClickLogin={this.clickLogin}
          handleClickLogout={this.clickLogout}
          handleClickRegister={this.clickRegister}
        />
        <Main clicked={this.state.clicked} />
        <Footer />
      </div>
    );
  }
}

export default App;
