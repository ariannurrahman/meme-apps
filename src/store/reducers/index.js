import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import AuthReducer from "./AuthReducer";
import ThemeReducer from "./ThemeReducer";
import LoadingReducer from "./LoadingReducer";

const themePersistConfig = {
  key: "dark",
  storage,
};

const authPersistConfig = {
  key: "memeAuth",
  storage: storage,
};

export default combineReducers({
  auth: persistReducer(authPersistConfig, AuthReducer),
  theme: persistReducer(themePersistConfig, ThemeReducer),
  isLoading: LoadingReducer,
});
