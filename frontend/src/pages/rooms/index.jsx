import React, { useEffect } from "react";
import useGetRooms from "./hook/useGetRooms";
import useSocket from "../../hook/useSocket";
import { useSelector } from "react-redux";
import useListenJoin from "./hook/useListenJoinRoom";
import { Board } from "../../components";

const RoomList = () => {
  const rooms = useSelector((state) => state.socket.rooms);
  useListenJoin();
  useSocket();
  const { joinRoom, joinRoomBot } = useGetRooms();
  const handleJoinRoom = (money) => {
    joinRoom(money);
  };
  const handleJoinRoomBot = () => {
    joinRoomBot();
  };

  const money = [100, 200, 500, 1000, 2000, 5000];
  return (
    <div>
      <h1>Available Rooms</h1>
      {rooms && rooms.status === "created" && <>Wait</>}
      {rooms === null && (
        <>
          <button
            className="btn btn-neutral m-5"
            onClick={() => handleJoinRoomBot()}
          >
            Play with bot
          </button>
          {money.map((item) => {
            return (
              <button
                className="btn btn-neutral m-5"
                onClick={() => handleJoinRoom(item)}
              >
                Join Room {item}
              </button>
            );
          })}
        </>
      )}
      {rooms && (rooms.status === "ready" || rooms.status === "finish") && (
        <Board />
      )}
    </div>
  );
};

export default RoomList;
