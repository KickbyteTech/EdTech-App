import react from 'react';
import { useState } from 'react';
import './ai-summarizer.css';
import Sidebar from '../components/Sidebar';

const Summarizer = () => {
  return (
    <div className="summarizer">
      <Sidebar />
      <h1>AI Summarizer</h1>
    </div>
  );
};

export default Summarizer;