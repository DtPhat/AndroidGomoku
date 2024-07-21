export const setSocket = (socket) => ({
  type: "SET_SOCKET",
  payload: socket,
});

export const setOnlineUsers = (users) => ({
  type: "SET_ONLINE_USERS",
  payload: users,
});

export const setRooms = (rooms) => ({
  type: "SET_ROOM",
  payload: rooms,
});
