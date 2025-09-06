// src/components/Dashboard.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Get user info from localStorage
  const userToken = JSON.parse(localStorage.getItem('TOKEN') || '{}');
  const userName = userToken.username || 'User';

  const taskCards = [
    {
      title: 'View All Tasks',
      description: 'View and manage all tasks in the system',
      link: '/tasks',
      icon: '📋',
      color: '#007bff'
    },
    {
      title: 'Create New Task',
      description: 'Create a new task and assign it to team members',
      link: '/create-task',
      icon: '➕',
      color: '#28a745'
    }
  ];

  const inventoryCards = [
    {
      title: 'View Inventory',
      description: 'View and manage all devices in inventory',
      link: '/inventory/devices',
      icon: '📦',
      color: '#17a2b8'
    },
    {
      title: 'Add Device',
      description: 'Add a new device to the inventory',
      link: '/inventory/add',
      icon: '🔧',
      color: '#28a745'
    },
    {
      title: 'Update Devices',
      description: 'Update existing device information',
      link: '/inventory/update',
      icon: '✏️',
      color: '#ffc107'
    },
    {
      title: 'Delete Devices',
      description: 'Remove devices from inventory',
      link: '/inventory/delete',
      icon: '🗑️',
      color: '#dc3545'
    }
  ];

  const issuingCards = [
    {
      title: 'Issued Devices',
      description: 'View all devices currently issued to clients',
      link: '/issuing',
      icon: '📤',
      color: '#6f42c1'
    },
    {
      title: 'Issue Device',
      description: 'Issue a device to a client',
      link: '/issuing/add',
      icon: '🎯',
      color: '#fd7e14'
    },
    {
      title: 'Update Status',
      description: 'Update the status of issued devices',
      link: '/issuing/status',
      icon: '🔄',
      color: '#20c997'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('TOKEN');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Task & Inventory Management Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {userName}!</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <section className="dashboard-section">
          <h2>Task Management</h2>
          <div className="card-grid">
            {taskCards.map((card, index) => (
              <Link key={index} to={card.link} className="dashboard-card" style={{'--card-color': card.color}}>
                <div className="card-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <h2>Inventory Management</h2>
          <div className="card-grid">
            {inventoryCards.map((card, index) => (
              <Link key={index} to={card.link} className="dashboard-card" style={{'--card-color': card.color}}>
                <div className="card-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <h2>Device Issuing</h2>
          <div className="card-grid">
            {issuingCards.map((card, index) => (
              <Link key={index} to={card.link} className="dashboard-card" style={{'--card-color': card.color}}>
                <div className="card-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;