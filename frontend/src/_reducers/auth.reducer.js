import authConstants from "../_constants/auth.constants";

const initialState = {
  username: "",
  verifiedAuth: false,
  verifying: "",
  error: ""
};

const auth = (state = initialState, action = {}) => {
  switch (action.type) {
    case authConstants.REQUEST_LOGIN_PENDING:
      return {
        ...state,
        loggingIn: true
      };
    case authConstants.REQUEST_LOGIN_FULFILLED:
      return {
        ...state,
        username: action.payload,
        loggingIn: false,
        verifiedAuth: true
      };
    case authConstants.REQUEST_LOGIN_REJECTED:
      return {
        ...state,
        ...initialState
      };
    case authConstants.REQUEST_VERIFY_AUTH_PENDING:
      return {
        ...state,
        verifying: true
      };
    case authConstants.REQUEST_VERIFY_AUTH_FULFILLED:
      return {
        ...state,
        verifiedAuth: true,
        verifying: false
      };
    case authConstants.REQUEST_VERIFY_AUTH_REJECTED:
      return {
        ...state,
        username: "",
        verifiedAuth: false,
        verifying: false
      };
    case authConstants.REQUEST_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default auth;
