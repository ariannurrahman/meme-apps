import { SIGN_IN, SIGN_OUT, DARK_MODE } from "./types";

export const signIn = (userData) => {
  return {
    type: SIGN_IN,
    payload: userData,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const toggleTheme = () => {
  return {
    type: DARK_MODE,
  };
};
