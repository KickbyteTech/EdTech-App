import react from 'react';
import { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';

const Summarizer = () => {
  return (
    <div className="summarizer">
      <Sidebar />
      <h1>AI Summarizer</h1>
    </div>
  );
};

export default Summarizer;