import React, { Component } from "react";
import { connect } from "react-redux";
import authActions from "../../../_actions/auth.actions";
// import ExpansionPanel from "../../organisms/ExpansionPanel";
// import Frame from "../../organisms/Frame";

import "./styles.css";

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  onLogout: event => {
    event.preventDefault();
    dispatch(authActions.logout());
  }
});

class HomePage extends Component {
  render() {
    return <p>Oi</p>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
