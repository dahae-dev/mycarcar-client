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
      isSignedIn: localStorage.getItem("x-access-token") ? true : false,
      clicked: "Home"
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleClick(comp: string) {
    this.setState({ clicked: comp });
    console.log("clicked: ", this.state.clicked);
  }

  handleLogin(result: boolean) {
    this.setState({ isSignedIn: result });
  }

  handleLogout() {
    this.setState({ isSignedIn: false });
  }

  render() {
    console.log("isSignedIn: ", this.state.isSignedIn);
    return (
      <div className="grid-container">
        <Header handleClick={this.handleClick} />
        <SideBar
          isSignedIn={this.state.isSignedIn}
          handleClick={this.handleClick}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
        />
        <Main
          clicked={this.state.clicked}
          isSignedIn={this.state.isSignedIn}
          handleLogin={this.handleLogin}
          handleClick={this.handleClick}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
