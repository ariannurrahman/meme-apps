import {
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_UP_ERROR,
  SIGN_UP_SUCCESS,
  RESET_ERROR,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_ERROR,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  CHANGE_DISPLAY_NAME_SUCCESS,
  CHANGE_DISPLAY_NAME_ERROR,
} from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
  userData: {},
  message: "",
};
const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return { ...state, isSignedIn: true, userData: action.payload, message: "Sign in success" };

    case SIGN_IN_ERROR:
      return { ...state, isSignedIn: false, userData: {}, message: action.payload };

    case SIGN_UP_SUCCESS:
      return { ...state, isSignedIn: true, userData: action.payload, message: "Sign up success" };

    case SIGN_UP_ERROR:
      return { ...state, isSignedIn: false, userData: {}, message: action.payload };

    case SIGN_OUT_SUCCESS:
      return { ...state, isSignedIn: false, userData: {}, message: action.payload };

    case SIGN_OUT_ERROR:
      return { ...state, isSignedIn: true, userData: {}, message: action.payload };

    case RESET_PASSWORD_SUCCESS:
      return { ...state, message: action.payload };

    case RESET_PASSWORD_ERROR:
      return { ...state, message: action.payload };

    case RESET_ERROR:
      return { ...state, message: "" };

    case CHANGE_DISPLAY_NAME_SUCCESS:
      return { ...state, userData: action.payload, message: "Change display name success!" };

    case CHANGE_DISPLAY_NAME_ERROR:
      return { ...state, message: "Change display name error" };

    default:
      return state;
  }
};

export default AuthReducer;
