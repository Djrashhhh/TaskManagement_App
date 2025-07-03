// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import InventoryList from './components/InventoryList';
import AddDevice from './components/AddDevice';
import UpdateDevice from './components/UpdateDevice';
import DeleteDevice from './components/DeleteDevice';
import IssuedDevList from './components/IssuedDevList';
import AddIssuing from './components/AddIssuing';
import UpdateIssuingStatus from './components/UpdateIssuingStatus';
import './App.css';

// Simple authentication check - updated to use 'TOKEN' to match Dashboard.js
const isAuthenticated = () => {
  return localStorage.getItem('TOKEN') !== null;
};

// Protected Route component
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public route - Login */}
          <Route path="/" element={<Login />} />
          
          {/* Protected routes - wrapped with Layout */}
          <Route path="/*" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            {/* Nested routes inside Layout */}
            <Route path="dashboard" element={<Dashboard />} />
            
            {/* Task routes */}
            <Route path="tasks" element={<TaskList />} />
            <Route path="create-task" element={<CreateTask />} />
            
            {/* Inventory routes */}
            <Route path="inventory/devices" element={<InventoryList />} />
            <Route path="inventory/add" element={<AddDevice />} />
            <Route path="inventory/update" element={<UpdateDevice />} />
            <Route path="inventory/update/:id" element={<UpdateDevice />} />
            <Route path="inventory/delete" element={<DeleteDevice />} />
            
            {/* Device issuing routes */}
            <Route path="issuing" element={<IssuedDevList />} />
            <Route path="issuing/add" element={<AddIssuing />} />
            <Route path="issuing/status" element={<UpdateIssuingStatus />} />
            <Route path="issuing/status/:id" element={<UpdateIssuingStatus />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;