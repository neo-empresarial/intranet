import userConstants from "../_constants/user.constants";

const initialState = {
  error: "",
  verifyingRegistration: false,
  finishedRegistration: false,
  data: {}
};

const auth = (state = initialState, action = {}) => {
  switch (action.type) {
    case userConstants.REQUEST_VERIFY_REGISTERED_PENDING:
      return {
        ...state,
        verifyingRegistration: true
      };
    case userConstants.REQUEST_VERIFY_REGISTERED_FULFILLED:
      return {
        ...state,
        verifyingRegistration: false,
        finishedRegistration: true,
        data: action.payload
      };
    case userConstants.REQUEST_VERIFY_REGISTERED_REJECTED:
      return {
        ...state,
        verifyingRegistration: false,
        finishedRegistration: false
      };
    default:
      return state;
  }
};

export default auth;
