// HEAD
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Frame from '../../organisms/Frame';

const mapStateToProps = state => ({
  verified: state.auth.verifiedAuth
});

const PrivateRoute = ({ component: Component, verified, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      true ? (
        <Frame>
          <Component {...props} />
        </Frame>
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default withRouter(connect(mapStateToProps)(PrivateRoute));
