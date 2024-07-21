import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessages } from "../redux/actions/messageAction";

const useListenMessages = () => {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket.socket);
  const messages = useSelector((state) => state.messages.messages);

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      dispatch(addMessages(newMessage));
    });

    return () => socket?.off("newMessage");
  }, [socket, messages]);
};
export default useListenMessages;
