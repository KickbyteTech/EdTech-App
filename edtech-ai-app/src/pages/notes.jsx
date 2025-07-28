import react from 'react';
import { useState } from 'react';
import './notes.css';
import Sidebar from '../components/Sidebar';

const Notes = () => {
  return (
    <div className="notes">
      <Sidebar />
      <h1>Notes</h1>
    </div>
  );
};

export default Notes;