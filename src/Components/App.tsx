import * as React from "react";
import { Header, SideBar, Main, Footer } from "./Layout";
import "./App.css";

interface IUserState {
  currentState: string;
  isOpen: boolean;
  sidebarToggle: string;
  mainToggle: string;
  footerToggle: string;
  isSignedIn: boolean;
}

class App extends React.Component<{}, IUserState> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentState: "Home",
      isOpen: false,
      sidebarToggle: "sidebar-open",
      mainToggle: "main-open",
      footerToggle: "footer-open",
      isSignedIn: localStorage.getItem("x-access-token") ? true : false
    };

    this.handleState = this.handleState.bind(this);
    this.handleSidebar = this.handleSidebar.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleState(changedState: string) {
    this.setState({ currentState: changedState });
  }

  handleSidebar() {
    this.setState({
      isOpen: !this.state.isOpen,
      sidebarToggle: this.state.isOpen ? "sidebar-open" : "sidebar-close",
      mainToggle: this.state.isOpen ? "main-open" : "main-close",
      footerToggle: this.state.isOpen ? "footer-open" : "footer-close"
    });
  }

  handleLogin(result: boolean) {
    this.setState({ isSignedIn: result });
  }

  handleLogout() {
    this.setState({ isSignedIn: false });
  }

  render() {
    // console.log("isSignedIn: ", this.state.isSignedIn);
    return (
      <div className="grid-container">
        <Header handleState={this.handleState} handleSidebar={this.handleSidebar} />

        <SideBar
          sidebarToggle={this.state.sidebarToggle}
          isSignedIn={this.state.isSignedIn}
          handleState={this.handleState}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
        />

        <Main
          mainToggle={this.state.mainToggle}
          currentState={this.state.currentState}
          isSignedIn={this.state.isSignedIn}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          handleState={this.handleState}
        />
        <Footer footerToggle={this.state.footerToggle} />
      </div>
    );
  }
}

export default App;
