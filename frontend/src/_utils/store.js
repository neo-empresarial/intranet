import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { persistStore } from "redux-persist";

import rootReducer from "../_reducers";

const logger = createLogger();

export const store = createStore(
  rootReducer,
  applyMiddleware(logger, thunkMiddleware)
);

export const persistor = persistStore(store);
