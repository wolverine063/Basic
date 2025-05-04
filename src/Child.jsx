import React, { useEffect, useState } from "react";

const Child = () => {
  const [count, setCount] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  //Start the timer when the component mounts
  const startTimer = () => {
    if (!isRunning) {
      const id = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
      setIntervalId(id);
      setIsRunning(true);
    }
  };
  //stop the timer

  const stopTimer = () => {
    clearInterval(intervalId);
    setIsRunning(false);
  };
  //clean the timer when the component unmounts

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <div>
      <h1>Timer: {count} seconds</h1>
      <button onClick={isRunning? stopTimer:startTimer}>
        {isRunning ? "Pause" : "Start"}
      </button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
};

export default Child;
