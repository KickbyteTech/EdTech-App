import react from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import ParticleBackground from '../../components/ParticleBackground';

const Dashboard = () => {
  const navigate = useNavigate();
  const navigateTo = (path) => () => navigate(`/${path}`);

  return (
    <div className="feature-section" id="dashboardSection">
      <div className="welcome-section">
        <h1>Welcome back, Buddy 🎓</h1>
        <p>Ready to crush your studies today? Let's make it happen!</p>
      </div>
      <div className="quick-stats">
        <div className="stat-card">
          <div className="stat-number">47</div>
          <div className="stat-label">Study Hours This Week</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">12</div>
          <div className="stat-label">Subjects Mastered</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">89%</div>
          <div className="stat-label">Goal Completion</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">3</div>
          <div className="stat-label">Streak Days</div>
        </div>
      </div>
      <div className="card-grid">
          <div className="feature-card" onClick={navigateTo('timer')}>
              <div className="card-icon">⏰</div>
              <h3>Focus Timer</h3>
              <p>Use the Pomodoro timer to stay focused and productive during your study sessions.</p>
              <button className="card-action">Start Session</button>
          </div>
          <div className="feature-card" onClick={navigateTo('summarizer')}>
              <div className="card-icon">🤖</div>
              <h3>AI Summarizer</h3>
              <p>Turn lengthy textbooks and articles into concise, digestible summaries in seconds.</p>
              <button className="card-action">Summarize Now</button>
          </div>
          <div className="feature-card" onClick={navigateTo('flashcards')}>
              <div className="card-icon">🃏</div>
              <h3>Smart Flashcards</h3>
              <p>AI generates flashcards from your notes. Spaced repetition optimizes learning.</p>
              <button className="card-action">Review Cards</button>
          </div>
          <div className="feature-card" onClick={navigateTo('roadmap')}>
              <div className="card-icon">🎯</div>
              <h3>AI Roadmap maker</h3>
              <p>AI generates personalized roadmap for your subject and duration.</p>
              <button className="card-action">Create Roadmap</button>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;