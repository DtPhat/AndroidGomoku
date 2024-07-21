import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setSocket, setOnlineUsers } from "../redux/actions/socketAction";

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    if (user) {
      const newSocket = io("http://localhost:8000", {
        query: {
          userId: user._id,
        },
      });

      dispatch(setSocket(newSocket));

      newSocket.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users));
      });

      return () => {
        newSocket.close();
        dispatch(setSocket(null));
      };
    }
  }, [user, dispatch]);

  return children;
};
