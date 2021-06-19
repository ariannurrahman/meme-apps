import { DARK_MODE } from "../actions/types";

const INITIAL_STATE = {
  darkMode: false,
};

const ThemeReducer = (state = INITIAL_STATE, action) => {
  if (action.type === DARK_MODE) {
    return { ...state, darkMode: !state.darkMode };
  }
  return state;
};

export default ThemeReducer;
