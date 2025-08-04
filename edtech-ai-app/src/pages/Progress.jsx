import react from 'react';
import { useState } from 'react';
import Sidebar from '../components/Sidebar/sidebar';
import ParticleBackground from '../components/ParticleBackground';

const Progress = () => {
  return (
    <div className="progress">
      <ParticleBackground/>
      <Sidebar />
      <h1>Progress</h1>
    </div>
  );
};

export default Progress;