import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";

import auth from "./auth.reducer";
import user from "./user.reducer";
import alert from "./alert.reducer";
import ui from "./ui.reducers";
import { persistReducer } from "redux-persist";

const rootPersistConfig = {
  key: "root",
  storage: storage
};

const uiPersistConfig = {
  key: "ui",
  storage: storageSession
};

const authPersistConfig = {
  key: "auth",
  storage: storage,
  blacklist: ["loggingIn", "loginFailed"]
};

const userPersistConfig = {
  key: "user",
  storage: storage,
  blacklist: ["fetchingData"]
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  user: persistReducer(userPersistConfig, user),
  ui: persistReducer(uiPersistConfig, ui),
  alert
});

export default persistReducer(rootPersistConfig, rootReducer);
