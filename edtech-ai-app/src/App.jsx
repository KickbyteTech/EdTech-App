import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import ParticleBackground from './components/ParticleBackground'; 

// Pages
import Dashboard from './pages/dashboard/dashboard';
import Timer from './pages/timer/timer';
import Summarizer from './pages/Summarizer';
import Flashcards from './pages/flashcards/flashcards';
import Settings from './pages/Settings';
import Notes from './pages/notes';
import Roadmap from './pages/ai-coursemaker/roadmap';

function App() {
  return (
    <Router>
      <div className="home-container">
        <ParticleBackground />
        <Sidebar />
        <main className="main">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/Flashcards" element={<Flashcards />} />
            <Route path="/summarizer" element={<Summarizer />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/roadmap" element={<Roadmap />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
