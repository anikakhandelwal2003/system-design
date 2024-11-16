import React, { useEffect, useState } from 'react';
import '../styles/timer.css';

function Timer() {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isRunning, setIsRunning] = useState(false);
  const [inputTime, setInputTime] = useState({
    hours: null,
    minutes: null,
    seconds: null,
  });

  const calculateTotalSeconds = (hours, minutes, seconds) =>
    hours * 3600 + minutes * 60 + seconds;

  const updateTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    setTime({ hours, minutes, seconds });
  };

  useEffect(() => {
    let interval = null;
    if (isRunning && calculateTotalSeconds(time.hours, time.minutes, time.seconds) > 0) {
      interval = setInterval(() => {
        const totalSeconds = calculateTotalSeconds(time.hours, time.minutes, time.seconds) - 1;
        updateTime(totalSeconds);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  const handleStart = () => {
    if (!isRunning && calculateTotalSeconds(inputTime.hours, inputTime.minutes, inputTime.seconds) > 0) {
      setTime(inputTime);
    }
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime({ hours: 0, minutes: 0, seconds: 0 });
    setInputTime({ hours: 0, minutes: 0, seconds: 0 });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputTime((prev) => ({ ...prev, [name]: Number(value) }));
  };

  return (
    <div className="timer-container">
      <h1>Timer</h1>
      <div className="input-container">
        <div className="input-group">
          <label>Hours</label>
          <input
            type="number"
            name="hours"
            value={inputTime.hours}
            onChange={handleInputChange}
            min="0"
          />
        </div>
        <div className="input-group">
          <label>Minutes</label>
          <input
            type="number"
            name="minutes"
            value={inputTime.minutes}
            onChange={handleInputChange}
            min="0"
            max="59"
          />
        </div>
        <div className="input-group">
          <label>Seconds</label>
          <input
            type="number"
            name="seconds"
            value={inputTime.seconds}
            onChange={handleInputChange}
            min="0"
            max="59"
          />
        </div>
      </div>
      <div className="time-display">
        
        {`${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`}
      </div>
      <div className="button-group">
        <button onClick={handleStart} className="start-button">Start</button>
        <button onClick={handleStop} className="stop-button">Stop</button>
        <button onClick={handleReset} className="reset-button">Reset</button>
      </div>
    </div>
  );
}

export default Timer;
