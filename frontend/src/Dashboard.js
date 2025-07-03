import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user authentication data (e.g., tokens) here if necessary
    // For example:
    localStorage.removeItem('TOKEN');

    // Redirect to the login page
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleViewTasks = () => {
    navigate('/tasks');
  };

  useEffect(() => {
    if (localStorage.getItem('TOKEN') == null) {
      navigate('/');
    }

    console.log(JSON.parse(localStorage.getItem('TOKEN')).user_id)
  }, [navigate])

  return (
    <div className="dashboard-container">
      {/* Top Navigation Bar */}
      <div className="top-navbar">
        <div className="navbar-content">
          <h1 className="dashboard-title">Welcome to the Dashboard</h1>
          <div className="profile-container">
            <button className="profile-icon" onClick={toggleDropdown}>
              Profile
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={handleLogout} className="dropdown-item">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Side Navigation Bar */}
        <div className="side-navbar">
          <nav className="nav-section">
            <button className="nav-button" onClick={() => navigate('/dashboard')}>
              Home
            </button>
          </nav>

          <nav className="nav-section">
            <div className="nav-section-title">Tasks</div>
            <button className="nav-button" onClick={handleViewTasks}>
              See All Tasks
            </button>
            <button className="nav-button" onClick={() => navigate('/create-task')}>
              Create a Task
            </button>
            <button className="nav-button" onClick={handleViewTasks}>
              Update Tasks
            </button>
          </nav>

          <nav className="nav-section">
            <div className="nav-section-title">Inventory</div>
            <button className="nav-button" onClick={() => navigate('/inventory/devices')}>
              Device List
            </button>
            <button className="nav-button" onClick={() => navigate('/inventory/add')}>
              Add a Device
            </button>
            <button className="nav-button" onClick={() => navigate('/inventory/devices')}>
              Update a Device
            </button>
            <button className="nav-button" onClick={() => navigate('/inventory/delete')}>
              Delete a Device
            </button>
          </nav>

          <nav className="nav-section">
            <div className="nav-section-title">Issuing</div>
            <button className="nav-button" onClick={() => navigate('/issuing')}>
              All Issued Devices
            </button>
            <button className="nav-button" onClick={() => navigate('/issuing/add')}>
              Add New Issuing
            </button>
            <button className="nav-button" onClick={() => navigate('/issuing/status')}>
              Update Issuing Status
            </button>
          </nav>
        </div>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <div className="content-area">
            <h2>Dashboard Overview</h2>
            <p>Welcome to your management dashboard. Use the sidebar to navigate to different sections.</p>
            
            {/* You can add dashboard widgets, charts, or other content here */}
            <div className="dashboard-widgets">
              <div className="widget">
                <h3>Quick Stats</h3>
                <p>Your dashboard content goes here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;