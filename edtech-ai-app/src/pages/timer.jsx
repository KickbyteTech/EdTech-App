import react from 'react';
import { useState } from 'react';
import Sidebar from '../components/Sidebar/sidebar';
import ParticleBackground from '../components/ParticleBackground';

const Timer = () => {
  return (
    <div className="timer">
      <ParticleBackground/>
      <Sidebar />
      <h1>AI Timer</h1>
    </div>
  );
};

export default Timer;