import React, { Component } from "react";
import axios from "axios";

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      value: props.data.block_after
    };
  }

  _onClick = () => {
    const { onLogout } = this.props;
    this.setState({
      user: ""
    });
    onLogout();
  };
  _onSelect = event => {
    const { user, password } = this.props;
    const value = event.target.value;

    axios({
      baseURL: "http://localhost:5000/Ps042.php",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*"
      },
      auth: {
        username: user,
        password: password
      },
      params: {
        par: value
      }
    })
      .then(response => {
        // console.log(response);
        if (response.status === 200) {
          // console.log("Response 200");
          if (response.data.name !== undefined) {
            this.setState({
              value: value,
              error: ""
            });
          } else {
            // console.log(response.data.info);
            this.setState({
              error: response.data.info || "Something wrong"
            });
          }
        } else {
          this.setState({
            error: "Something wrong"
          });
        }
      })
      .catch(error => {
        // console.log(error.response.status);
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
  };

  render() {
    const { data } = this.props;
    const { error, value } = this.state;
    return (
      <div className="login-page">
        <div className="form">
          <h1 className="h1">{data.name}</h1>
          <h2 className="h2">Last login: {data.last_login}</h2>
          <h2 className="h2">Last failed login: {data.last_failed_login}</h2>
          <h2 className="h2">
            Failed attemps login: {data.failed_attemps_login}
          </h2>
          <h2 className="h2">
            Block after:
            <select name="block_after" value={value} onChange={this._onSelect}>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
            failed attemps
          </h2>
          <div className="login-error">{error}</div>
          <p />
          <button
            onClick={() => {
              this._onClick();
            }}
          >
            logout
          </button>
        </div>
      </div>
    );
  }
}

export default UserPage;
