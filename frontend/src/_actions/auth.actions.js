import authConstants from "../_constants/auth.constants.js";
import alertActions from "./alert.actions";
import authServices from "../_services/auth.service";
import { persistor } from "../_utils/store";
import history from "../_utils/history";

const login = event => async dispatch => {
  dispatch({
    type: authConstants.REQUEST_LOGIN_PENDING
  });

  try {
    const user = await authServices.login(
      event.target.username.value,
      event.target.password.value
    );

    dispatch({
      type: authConstants.REQUEST_LOGIN_FULFILLED,
      payload: user
    });

    history.push("/");
  } catch (err) {
    dispatch({
      type: authConstants.REQUEST_LOGIN_REJECTED,
      payload: err
    });
    dispatch(alertActions.clear());
    dispatch(alertActions.error("Sigla ou senha incorreta!"));
  }
};

const verifyAuth = () => async dispatch => {
  dispatch({
    type: authConstants.REQUEST_VERIFY_AUTH_PENDING
  });

  const userResponse = await authServices.verifyAuth();

  userResponse;

  userResponse.ok
    ? dispatch({
        type: authConstants.REQUEST_VERIFY_AUTH_FULFILLED
      })
    : dispatch({
        type: authConstants.REQUEST_VERIFY_AUTH_REJECTED
      });
};

const logout = () => async dispatch => {
  dispatch({
    type: authConstants.REQUEST_LOGOUT
  });

  await authServices.logout();
  persistor.purge();
};

const authActions = {
  login,
  logout,
  verifyAuth
};

export default authActions;
