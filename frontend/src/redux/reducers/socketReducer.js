const initialState = {
  socket: null,
  onlineUsers: [],
  rooms: null,
};

function socketReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_SOCKET":
      return {
        ...state,
        socket: action.payload,
      };
    case "SET_ONLINE_USERS":
      return {
        ...state,
        onlineUsers: action.payload,
      };
    case "SET_ROOM":
      return {
        ...state,
        rooms: action.payload,
      };
    default:
      return state;
  }
}

export default socketReducer;
