import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import ParticleBackground from './components/ParticleBackground'; 

// Pages
import Dashboard from './pages/dashboard/dashboard';
import Timer from './pages/Timer';
import Summarizer from './pages/Summarizer';
import Flashcards from './pages/Flashcards';
import Settings from './pages/Settings';
import Notes from './pages/notes';

function App() {
  return (
    <Router>
      <div className="home-container">
        <ParticleBackground/>
        <Sidebar />
        <main className="main">
          <Routes>
            <Route path="/" elements={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" elements={<Dashboard />} />
            <Route path="/timer" elements={<Timer />} />
            <Route path="/summarizer" elements={<Summarizer />} />
            <Route path="/flashcards" elements={<Flashcards />} />
            <Route path="/settings" elements={<Settings />} />
            <Route path="/notes" elements={<Notes />} />
        
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
