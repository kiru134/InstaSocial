import { combineReducers } from "redux";
import { userSlice } from "../features/UserSlice";

export const rootReducer = combineReducers({
  user: userSlice.reducer,
});
