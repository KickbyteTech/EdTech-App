import react from 'react';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import ParticleBackground from '../../components/ParticleBackground';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <ParticleBackground />
      <Sidebar />

      {/* <!-- Home Page --> */}
      <div class="home-container" id="homePage">
    
    <div class="main">

      <div class="feature-section" id="dashboardSection">
        <div class="welcome-section">
          <h1>Welcome back, Karan! 🎓</h1>
          <p>Ready to crush your studies today? Let's make it happen!</p>
        </div>
        <div class="quick-stats">
          <div class="stat-card">
            <div class="stat-number">47</div>
            <div class="stat-label">Study Hours This Week</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">12</div>
            <div class="stat-label">Subjects Mastered</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">89%</div>
            <div class="stat-label">Goal Completion</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">3</div>
            <div class="stat-label">Streak Days</div>
          </div>
        </div>
        <div class="card-grid">
            <div class="feature-card" onclick="navigateTo('timer')">
                <div class="card-icon">⏰</div>
                <h3>Focus Timer</h3>
                <p>Use the Pomodoro timer to stay focused and productive during your study sessions.</p>
                <button class="card-action">Start Session</button>
            </div>
            <div class="feature-card" onclick="navigateTo('summarizer')">
                <div class="card-icon">🤖</div>
                <h3>AI Summarizer</h3>
                <p>Turn lengthy textbooks and articles into concise, digestible summaries in seconds.</p>
                <button class="card-action">Summarize Now</button>
            </div>
            <div class="feature-card" onclick="navigateTo('flashcards')">
                <div class="card-icon">🃏</div>
                <h3>Smart Flashcards</h3>
                <p>AI generates flashcards from your notes. Spaced repetition optimizes learning.</p>
                <button class="card-action">Review Cards</button>
            </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Dashboard;