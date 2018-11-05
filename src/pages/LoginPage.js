import React, { Component } from "react";
import axios from "axios";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      time: 0
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.state.time > 0) {
      return;
    }
    const { onLogin } = this.props;
    const {
      username: { value: usernameValue = "" } = {},
      password: { value: passwordValue = "" } = {}
    } = this.refs;

    axios({
      baseURL: "http://localhost:5000/Ps04.php",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*"
      },
      auth: {
        username: usernameValue,
        password: passwordValue
      }
    })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          console.log("Response 200");
          if (response.data.name !== undefined) {
            onLogin(usernameValue, passwordValue, response.data);
          } else {
            this.refs.username.value = "";
            this.refs.password.value = "";
            console.log(response.data.info);
            this.setState(
              {
                error: response.data.info || "Something wrong",
                time: Math.floor(response.data.time) || 0
              },
              this._countToZero()
            );
          }
        } else {
          this.setState({
            error: "Something wrong"
          });
        }
      })
      .catch(error => {
        console.log(error.response.status);
        if (error.response.status === 401) {
          this.setState({
            error: error.response.statusText
          });
        } else {
          this.setState({
            error:
              error.response !== undefined
                ? error.response.data.error
                : error.toString()
          });
        }
      });
  }
  _countToZero = () => {
    const myTimer = setInterval(() => {
      if (this.state.time === 0) {
        clearInterval(myTimer);
        this.setState({
          error: ""
        });
        return;
      }
      this.setState(
        prevState => ({
          time: prevState.time - 1
        }),
        () => {
          if (this.state.time === 0) {
            clearInterval(myTimer);
            this.setState({
              error: ""
            });
          }
        }
      );
    }, 1000);
  };
  render() {
    const { error, time } = this.state;
    return (
      <div className="login-page">
        <div className="form">
          <form className="login-form" onSubmit={this.onSubmit}>
            <input
              type="text"
              placeholder="username"
              ref="username"
              id="username"
              autoFocus
            />
            <input
              type="password"
              placeholder="password"
              ref="password"
              id="password"
            />
            <div className="login-error">{error}</div>
            {time !== 0 && <div className="login-error">{time} s</div>}
            <button type="submit">login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
