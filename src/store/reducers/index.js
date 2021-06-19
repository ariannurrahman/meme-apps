import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import ThemeReducer from "./ThemeReducer";

const authPersistConfig = {
  key: "auth",
  storage: storage,
};

const themePersistConfig = {
  key: "dark",
  storage,
};

export default combineReducers({
  auth: persistReducer(authPersistConfig, AuthReducer),
  darkMode: persistReducer(themePersistConfig, ThemeReducer),
});
