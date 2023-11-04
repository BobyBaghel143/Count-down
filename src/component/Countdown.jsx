import { useState, useEffect, useRef } from "react";
import "./Countdown.css";

function Countdown() {
  const [target, setTarget] = useState(null);
  const [diff, setDiff] = useState(0);
  const id = useRef(0);

  function handleSubmit() {
    id.current = setInterval(() => {
      setDiff(new Date(target) - new Date());
    }, 1000);
  }

  function handlePaused() {
    id.current = setInterval(() => {
      setDiff(new Date(target) - new Date());
    }, 0);
  }


  function handleReset() {
    id.current = setInterval(() => {
      setDiff(new Date(target) - new Date(target));
    }, 0);
  }

  useEffect(() => {
    if (diff < 0) {
      clearInterval(id.current);
      setDiff(0);
    }
  }, [diff]);

  const getDays = () => {
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const getHours = () => {
    const hoursInMs = diff % (1000 * 60 * 60 * 24);
    return Math.floor(hoursInMs / (1000 * 60 * 60));
  };

  const getMinutes = () => {
    const minutesInMs = diff % (1000 * 60 * 60);
    return Math.floor(minutesInMs / (1000 * 60));
  };

  const getSeconds = () => {
    const secondsInMs = diff % (1000 * 60);
    return Math.floor(secondsInMs / 1000);
  };

  return (
    <div className="container">
      <h1>Countdown Timer App</h1>

      <div id="input">
        <input
          type="datetime-local"
          id="datetime"
          onChange={(e) => setTarget(e.target.value)}
        />
        <button id="Submit"  onClick={handleSubmit}> Start </button>
        <button id="Paused"  onClick={handlePaused}> Paused</button>
        <button id="Reset"   onClick={handleReset}> Reset </button>
      </div>
          
      <div className="diff"> {diff} </div>

      <div id="display">
        <ul>
          <li><span id="days">{getDays()}</span>Days</li>
          <li><span id="hours">{getHours()}</span>Hours</li>
          <li><span id="minutes">{getMinutes()}</span>Minutes</li>
          <li><span id="seconds">{getSeconds()}</span>Seconds</li>
        </ul>
      </div>
    </div>
  );
}

export default Countdown;
