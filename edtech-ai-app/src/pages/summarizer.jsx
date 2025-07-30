import react from 'react';
import { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import ParticleBackground from '../components/ParticleBackground';

const Summarizer = () => {
  return (
    <div className="summarizer">
      <ParticleBackground/>
      <Sidebar />
      <h1>AI Summarizer</h1>
    </div>
  );
};

export default Summarizer;