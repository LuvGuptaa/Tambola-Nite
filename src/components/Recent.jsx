// Recent.js
import React from "react";

const Recent = ({ lastNumber, currentNumber }) => {
  return (
    <div className="w-full mt-8 text-4xl text-[#DCBF69] font-bold flex justify-around">
      <div className="flex flex-col gap-4">
        <h1>Last Number</h1>
        <h1 className="text-[5rem]">{lastNumber || "-"}</h1>
      </div>
      <div className="flex flex-col gap-4">
        <h1>Current Number</h1>
        <h1 className="text-[5rem]">{currentNumber || "-"}</h1>
      </div>
    </div>
  );
};

export default Recent;
