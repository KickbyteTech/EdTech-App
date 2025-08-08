import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import ParticleBackground from './components/ParticleBackground'; 

// Pages
import Dashboard from './pages/dashboard/dashboard';
import Timer from './pages/timer/timer';
import Summarizer from './pages/Summarizer';
import Flashcards from './pages/Flashcards';
import Settings from './pages/Settings';
import Notes from './pages/notes';

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
            <Route path="/summarizer" element={<Summarizer />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notes" element={<Notes />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
