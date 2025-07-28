import react from 'react';
import { useState } from 'react';
import './Flashcards.css';
import Sidebar from '../components/Sidebar';

const Flashcards = () => {
  return (
    <div className="flashcards">
      <Sidebar />
      <h1>Flashcards</h1>
    </div>
  );
};

export default Flashcards;