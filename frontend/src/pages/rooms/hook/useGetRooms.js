import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setRooms } from "../../../redux/actions/socketAction";

const useGetRooms = () => {
  const socket = useSelector((state) => state.socket.socket);
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket) {
      socket?.on("joinroom-success", (rooms) => {
        dispatch(setRooms(rooms));

        toast("Play");
      });
      socket?.on("waiting-play", (rooms) => {
        dispatch(setRooms(rooms));
        toast("waiting");
      });
      socket?.on("emely-scrare", (rooms) => {
        dispatch(setRooms(rooms));
        toast("Đối thủ đã thoát");
      });
      socket?.on("not-enough-money", () => {
        toast("Not enough money");
      });
      return () => {
        socket.close();
      };
    }
    if (socket) {
      socket?.on("waiting-play", (rooms) => {
        toast("waiting");
      });
      return () => {
        socket.close();
      };
    }
  }, [socket]);
  const joinRoom = async (money) => {
    socket.emit("joinroom", {
      user: user,
      money: money,
    });
  };
  const joinRoomBot = async () => {
    socket.emit("joinroom-ai", {
      user: user,
    });
  };

  return { joinRoom, joinRoomBot };
};

export default useGetRooms;
