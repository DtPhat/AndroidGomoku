const initialState = {
  sellectConversation: null,
  dataReceiver: null,
  Receiver: [],
};

const conversationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELLECT_CONVERSATION":
      return {
        ...state,
        sellectConversation: action.payload,
      };
    default:
      return state;
  }
};

export default conversationReducer;
