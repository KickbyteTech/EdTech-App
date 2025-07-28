import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';

// Pages
import Dashboard from './pages/Dashboard';
import Timer from './pages/Timer';
import Summarizer from './pages/Summarizer';
import Flashcards from './pages/Flashcards';
import Settings from './pages/Settings';  
function App() {
  return (
    <Router>
      <div className="home-container">
        <Sidebar />
        <main className="main">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/summarizer" element={<Summarizer />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/settings" element={<Settings />} />
        
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
