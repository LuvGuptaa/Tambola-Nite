import React, { useState, useEffect } from "react";
import Board from "../components/Board";
import Recent from "../components/Recent";
import Footer from "../components/Footer";
import Undo from "../assets/undo-btn.png";
import Reset from "../assets/reset-btn.png";

const Game = () => {
  const [pickedNumbers, setPickedNumbers] = useState([]);
  const [lastNumber, setLastNumber] = useState(null);
  const [currentNumber, setCurrentNumber] = useState(null);

  // Load the game state from local storage when the component mounts
  useEffect(() => {
    const savedPickedNumbers = JSON.parse(
      localStorage.getItem("pickedNumbers")
    );
    const savedLastNumber = localStorage.getItem("lastNumber");
    const savedCurrentNumber = localStorage.getItem("currentNumber");

    if (savedPickedNumbers && savedPickedNumbers.length > 0) {
      setPickedNumbers(savedPickedNumbers);
      setLastNumber(savedLastNumber ? Number(savedLastNumber) : null);
      setCurrentNumber(savedCurrentNumber ? Number(savedCurrentNumber) : null);
    }
  }, []);

  // Save the game state to local storage whenever pickedNumbers changes
  useEffect(() => {
    localStorage.setItem("pickedNumbers", JSON.stringify(pickedNumbers));
    localStorage.setItem("lastNumber", lastNumber);
    localStorage.setItem("currentNumber", currentNumber);
  }, [pickedNumbers, lastNumber, currentNumber]);

  const handleNumberClick = (number) => {
    if (!pickedNumbers.includes(number)) {
      setLastNumber(currentNumber);
      setCurrentNumber(number);
      setPickedNumbers([...pickedNumbers, number]);
    }
  };

  const handleUndo = () => {
    if (pickedNumbers.length > 0) {
      const updatedPickedNumbers = [...pickedNumbers];
      updatedPickedNumbers.pop();

      setPickedNumbers(updatedPickedNumbers);
      setCurrentNumber(lastNumber);
      setLastNumber(
        updatedPickedNumbers[updatedPickedNumbers.length - 2] || null
      );
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the game?")) {
      setPickedNumbers([]);
      setLastNumber(null);
      setCurrentNumber(null);
      localStorage.removeItem("pickedNumbers");
      localStorage.removeItem("lastNumber");
      localStorage.removeItem("currentNumber");
    }
  };

  return (
    <div className="relative h-full flex flex-col justify-center">
      <Board pickedNumbers={pickedNumbers} onNumberClick={handleNumberClick} />
      <Recent lastNumber={lastNumber} currentNumber={currentNumber} />
      <div className="w-[100%] flex justify-between px-8 z-10 relative">
        <button
          onClick={handleUndo}
          className="p-2 border border-[#E3C041] rounded-lg text-[#E3C041]"
        >
          <img src={Undo} alt="undo" height={25} width={25} />
        </button>
        <button
          onClick={handleReset}
          className="p-2 border border-[#E3C041] rounded-lg text-[#E3C041]"
        >
          <img src={Reset} alt="reset" height={25} width={25} />
        </button>
      </div>
      <div className="absolute w-full bottom-4">
        <Footer />
      </div>
    </div>
  );
};

export default Game;
