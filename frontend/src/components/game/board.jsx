import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useListenCaro from "../../hook/listenCaro";

const CaroBoard = () => {
  const rooms = useSelector((state) => state.socket.rooms);
  const socket = useSelector((state) => state.socket.socket);
  const user = useSelector((state) => state.user.data);
  const { game } = useListenCaro();

  const initialBoard = Array(12)
    .fill(null)
    .map(() => Array(12).fill(""));
  const [board, setBoard] = useState(initialBoard);

  useEffect(() => {
    if (game) {
      setBoard(game);
    }
  }, [game]);

  const handleClick = (row, col) => {
    // Check if it's the user's turn
    if (rooms.turn !== user._id || rooms.status === "finish") {
      return; // If it's not the user's turn, do nothing
    }

    const newBoard = board.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col
          ? cell === ""
            ? user._id === rooms.playerX._id
              ? "X"
              : "O"
            : cell
          : cell
      )
    );
    socket.emit("move", { user: user._id, row: row, col: col });
    setBoard(newBoard);
  };

  return (
    <>
      {rooms && rooms.turn === user._id ? (
        <div>Your turn</div>
      ) : (
        <div>Not your turn</div>
      )}
      <div className="flex flex-col mx-auto">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className="w-7 h-7 flex items-center justify-center border border-black text-2xl cursor-pointer bg-slate-50"
                onClick={() => handleClick(rowIndex, colIndex)}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default CaroBoard;
