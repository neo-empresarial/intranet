import alertConstants from "../_constants/alert.constants";

function success(message) {
  return {
    type: alertConstants.SUCCESS,
    payload: message
  };
}

function error(message) {
  return {
    type: alertConstants.ERROR,
    payload: message
  };
}

function clear() {
  return {
    type: alertConstants.CLEAR
  };
}

const alertActions = {
  success,
  error,
  clear
};

export default alertActions;
