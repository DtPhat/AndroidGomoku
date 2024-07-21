import { combineReducers } from "redux";
import conversationReducer from "../reducers/conversationReducer";

export default combineReducers({
  conversation: conversationReducer,
});

export const sellectConversation = (idConversation) => ({
  type: "SELLECT_CONVERSATION",
  payload: idConversation,
});
