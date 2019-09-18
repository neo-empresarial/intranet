import userConstants from "../_constants/user.constants";
import { userService } from "../_services/user.service";
import history from "../_utils/history";
import apiUrls from "../_utils/paths";
import authHeader from "../_utils/auth-header";
import { withRouter } from "react-router-dom";
import alertActions from "./alert.actions";

const logout = () => async dispatch => {
  dispatch({
    type: userConstants.REQUEST_LOGOUT
  });
  await userService.logout();
  history.push("/login");
};

const verifyUserRegistered = () => async dispatch => {
  dispatch({
    type: userConstants.REQUEST_VERIFY_REGISTERED_PENDING
  });

  const userData = await userService.returnUserData();

  if (userData) {
    dispatch({
      type: userConstants.REQUEST_VERIFY_REGISTERED_FULFILLED,
      payload: userData
    });
  } else {
    dispatch({
      type: userConstants.REQUEST_VERIFY_REGISTERED_REJECTED
    });

    history.push("/equipe/meu_perfil");

    dispatch(
      alertActions.error("Terminar cadastro antes de prosseguir com uso!")
    );
  }
};

const userActions = {
  logout,
  verifyUserRegistered
  // register
};

export default withRouter(userActions);
