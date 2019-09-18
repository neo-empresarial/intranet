import React, { Component } from "react";
import { connect } from "react-redux";
import authActions from "../../../_actions/auth.actions";

import loggingInGif from "../../atoms/loading_gif/loggingIn.gif";
import "./styles.css";

const mapStateToProps = state => ({
  loggingIn: state.auth.loggingIn,
  loginFailed: state.auth.loginFailed,
  error: state.alert.error
});

const mapDispatchToProps = dispatch => ({
  requestLogin: event => {
    event.preventDefault();
    dispatch(authActions.login(event));
  }
});

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.username.length >= 3 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    this.props.requestLogin(event);
  };

  render() {
    return (
      <div className="login col-3">
        <div className="login-header">
          <h1>Bem Vindo(a)!</h1>
          <h2>Por favor, insira sua sigla e senha para prosseguir</h2>
          {this.props.loggingIn && <img src={loggingInGif} alt="loading..." />}
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Sigla"
              onChange={this.handleChange}
              value={this.state.username}
            />
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Senha"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </div>
          <button
            type="submit"
            className="btn btn-login"
            disabled={!this.validateForm()}
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
