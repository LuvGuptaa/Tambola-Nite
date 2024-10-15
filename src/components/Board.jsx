// Board.js
import React from "react";

const Board = ({ pickedNumbers, onNumberClick }) => {
  const numbers = Array.from({ length: 90 }, (_, i) => i + 1);

  return (
    <div className="board grid grid-cols-10 px-32 w-full">
      {numbers.map((number) => (
        <div
          key={number}
          onClick={() => onNumberClick(number)}
          className={`flex text-3xl items-center justify-center cursor-pointer border border-[#E3C041] p-5 font-bold 
            ${
              pickedNumbers.includes(number)
                ? "bg-[#E3C041] text-[#190D2C]"
                : "bg-[#190D2C] text-[#E3C041]"
            }`}
        >
          {number}
        </div>
      ))}
    </div>
  );
};

export default Board;
