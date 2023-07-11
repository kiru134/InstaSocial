import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
// import {  } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const persistConfig = {
  key: "main-root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: { data: persistedReducer },
  middleware: [thunk],
});

const Persisitor = persistStore(store);

export { Persisitor, store };

// export const store = configureStore({
//   reducer: { data: rootReducer },
// });
