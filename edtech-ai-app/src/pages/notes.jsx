import react from 'react';
import { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';

const Notes = () => {
  return (
    <div className="notes">
      <Sidebar />
      <h1>Notes</h1>
    </div>
  );
};

export default Notes;