import React, { useState, useEffect, useRef } from 'react';
import './timer.css';

const PomodoroTimer = () => {
  const FULL_DASH_ARRAY = 2 * Math.PI * 100; // r=100
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionLabel, setSessionLabel] = useState("Work");

  const intervalRef = useRef(null);

  // Toggle Play/Pause
  const togglePause = () => {
    setIsRunning(prev => !prev);
  };

  // Start Timer
  const startTimer = () => {
    setIsRunning(true);
  };

  // Reset Timer
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTimeLeft(25 * 60);
    setSessionLabel("Work");
  };

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev > 0) return prev - 1;
          clearInterval(intervalRef.current);
          return 0;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // Format mm:ss
  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // Progress circle offset
  const progressOffset = FULL_DASH_ARRAY - (timeLeft / (25 * 60)) * FULL_DASH_ARRAY;

  return (
    <div className="feature-section" id="timerSection">
      <div className="feature-card">
        <div className="card-icon">⏰</div>
        <h3>Pomodoro Timer</h3>

        <div className="clock-wrapper" onClick={togglePause}>
          <svg className="progress-ring" width="220" height="220">
            <circle
              className="progress-ring__bg"
              r="100"
              cx="110"
              cy="110"
            />
            <circle
              className="progress-ring__circle"
              r="100"
              cx="110"
              cy="110"
              strokeDasharray={FULL_DASH_ARRAY}
              strokeDashoffset={progressOffset}
            />
          </svg>

          <div className="clock-overlay">
            <div className="session-label">{sessionLabel}</div>
            <div className="timer-text">{formatTime(timeLeft)}</div>
            <div className="playpause-icon">
              {isRunning ? "⏸️" : "▶️"}
            </div>
          </div>
        </div>

        <div className="timer-buttons">
          <button className="card-action" onClick={startTimer}>Start</button>
          <button className="card-action" onClick={resetTimer}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
