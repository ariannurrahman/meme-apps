import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";

import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import reduxThunk from "redux-thunk";
import reducers from "./store/reducers";

import App from "./components/App";
const persistConfig = {
  key: "root",
  storage,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(reduxThunk)));

let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>,

  document.getElementById("root")
);
