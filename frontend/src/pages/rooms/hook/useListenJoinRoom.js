import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRooms } from "../../../redux/actions/socketAction";

const useListenJoin = () => {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket.socket);
  const rooms = useSelector((state) => state.socket.rooms);

  useEffect(() => {
    socket?.on("roomUserCount", (gameRooms) => {
      dispatch(setRooms(gameRooms));
    });

    return () => socket?.off("roomUserCount");
  }, [socket]);
};
export default useListenJoin;
