import alertConstants from "../_constants/alert.constants";

function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        success: action.payload
      };
    case alertConstants.ERROR:
      return {
        error: action.payload
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state;
  }
}

export default alert;
