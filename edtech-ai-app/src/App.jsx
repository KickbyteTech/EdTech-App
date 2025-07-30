import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';

// Pages
import Dashboard from './pages/Dashboard';
import Timer from './pages/Timer';
import Summarizer from './pages/Summarizer';
import Settings from './pages/Settings';  
function App() {
  return (
    <Router>
      <div className="home-container">
        <Sidebar />
        <main className="main">
          <Routes>
            <Route path="/" elements={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" elements={<Dashboard />} />
            <Route path="/timer" elements={<Timer />} />
            <Route path="/summarizer" elements={<Summarizer />} />
            <Route path="/settings" elements={<Settings />} />
        
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
