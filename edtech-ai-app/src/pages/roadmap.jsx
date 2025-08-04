import react from 'react';
import { useState } from 'react';
import Sidebar from '../components/Sidebar/sidebar';
import ParticleBackground from '../components/ParticleBackground';

const Roadmap = () => {
  return (
    <div className="roadmap">
      <ParticleBackground/>
      <Sidebar />
      <h1>Roadmap</h1>
    </div>
  );
};

export default Roadmap;