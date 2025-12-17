import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import Sidebar from './components/Sidebar/Sidebar';
import ParticleBackground from './components/ParticleBackground'; 

// Pages
import AuthPage from './pages/login-signup/AuthPage';
import Dashboard from './pages/dashboard/dashboard';
import Timer from './pages/timer/timer';
import Flashcards from './pages/flashcards/flashcards';
import Settings from './pages/Settings';
import Notes from './pages/notes';
import Roadmap from './pages/ai-coursemaker/roadmap';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Protected Routes with Sidebar */}
          <Route
            element={
              <PrivateRoute>
                <div className="home-container">
                  <ParticleBackground />
                  <Sidebar />
                  <main className="main">
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/timer" element={<Timer />} />
                      <Route path="/Flashcards" element={<Flashcards />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/notes" element={<Notes />} />
                      <Route path="/roadmap" element={<Roadmap />} />
                    </Routes>
                  </main>
                </div>
              </PrivateRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/roadmap" element={<Roadmap />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
