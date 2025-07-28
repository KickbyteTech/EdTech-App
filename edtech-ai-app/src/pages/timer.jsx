import react from 'react';
import { useState } from 'react';
import './timer.css';
import Sidebar from '../components/Sidebar';

const Timer = () => {
  return (
    <div className="timer">
      <Sidebar />
      <h1>AI Timer</h1>
    </div>
  );
};

export default Timer;