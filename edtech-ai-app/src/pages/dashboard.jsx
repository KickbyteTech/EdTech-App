import react from 'react';
import { useState } from 'react';
import './dashboard.css';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;