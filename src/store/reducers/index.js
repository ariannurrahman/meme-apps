import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";

import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";
import ThemeReducer from "./ThemeReducer";

const themePersistConfig = {
  key: "dark",
  storage,
};

const authPersistConfig = {
  key: "auth",
  storage: storage,
};

export default combineReducers({
  auth: persistReducer(authPersistConfig, AuthReducer),
  theme: persistReducer(themePersistConfig, ThemeReducer),
});
