import { combineReducers } from "redux";
import userReducer from "./userReducer";
import conversationReducer from "./conversationReducer";
import messagesReducer from "./messagesReducer";
import socketReducer from "./socketReducer";

export default combineReducers({
  user: userReducer,
  conversation: conversationReducer,
  messages: messagesReducer,
  socket: socketReducer,
});
