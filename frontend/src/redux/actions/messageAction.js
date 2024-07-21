import { combineReducers } from "redux";
import messageReducer from "../reducers/messagesReducer";

export default combineReducers({
  messages: messageReducer,
});

export const storeMessages = (data) => ({
  type: "STORE_MESSAGE",
  payload: data,
});
export const addMessages = (data) => ({
  type: "ADD_MESSAGE",
  payload: data,
});
