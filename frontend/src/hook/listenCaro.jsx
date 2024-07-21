import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessages } from "../redux/actions/messageAction";
import { setRooms } from "../redux/actions/socketAction";
import { toast } from "react-toastify";

const useListenCaro = () => {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket.socket);
  const user = useSelector((state) => state.user.data);
  const [game, setGame] = useState();

  useEffect(() => {
    socket?.on("move", (data) => {
      dispatch(setRooms(data));
      setGame(data.game);
    });
    socket?.on("finish-game", (data) => {
      dispatch(setRooms(null));
      if (data.winner !== user._id) {
        toast("You lose");
      } else {
        toast("You win");
      }
      setGame(data.game);
    });

    return () => {
      socket?.off("move");
      socket?.off("finish-game");
    };
  }, [socket]);
  return { game };
};
export default useListenCaro;
