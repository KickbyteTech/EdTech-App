import react from 'react';
import { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import ParticleBackground from '../components/ParticleBackground';

const Flashcards = () => {
  return (
    <div className="flashcards">
      <ParticleBackground />
      <Sidebar />
      <h1>Flashcards</h1>
    </div>
  );
};

export default Flashcards;