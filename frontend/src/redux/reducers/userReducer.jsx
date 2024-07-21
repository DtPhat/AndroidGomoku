const initialState = {
  isLoggedIn: false,
  data: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        data: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        data: null,
      };
    default:
      return state;
  }
};

export default userReducer;
