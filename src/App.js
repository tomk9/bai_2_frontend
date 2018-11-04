import React, { Component, Fragment } from "react";

import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: "",
      data: {}
    };
  }
  onLogin = (user, password, data) => {
    this.setState({
      user,
      password,
      data
    });
  };
  onLogout = () => {
    this.setState({
      user: "",
      password: "",
      data: {}
    });
  };
  render() {
    const { user, password, data } = this.state;
    return (
      <Fragment>
        {user === "" ? (
          <LoginPage onLogin={this.onLogin} />
        ) : (
          <UserPage
            onLogout={this.onLogout}
            user={user}
            password={password}
            data={data}
          />
        )}
      </Fragment>
    );
  }
}

export default App;
