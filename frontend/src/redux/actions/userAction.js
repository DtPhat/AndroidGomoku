import { combineReducers } from "redux";
import userReducer from "../reducers/userReducer";

export default combineReducers({
  user: userReducer,
});

export const loginSuccess = (data) => ({
  type: "LOGIN_SUCCESS",
  payload: data,
});
export const logout = () => ({
  type: "LOGOUT",
});
