import { SIGN_IN, SIGN_OUT } from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
  address: "",
  age: 0,
  email: "",
  level: "",
  name: "",
  username: "",
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, data: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, data: "Signed out" };
    default:
      return state;
  }
};

export default AuthReducer;
