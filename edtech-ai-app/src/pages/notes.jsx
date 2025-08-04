import react from 'react';
import { useState } from 'react';
import Sidebar from '../components/Sidebar/sidebar';
import ParticleBackground from '../components/ParticleBackground';

const Notes = () => {
  return (
    <div className="notes">
      <ParticleBackground />
      <Sidebar />
      <h1>Notes</h1>
    </div>
  );
};

export default Notes;