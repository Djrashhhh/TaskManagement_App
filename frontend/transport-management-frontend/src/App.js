import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
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

// Authentication check function
const checkAuthentication = () => {
  const token = localStorage.getItem('TOKEN');
  return token !== null;
};

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStatus = checkAuthentication();
    setIsAuthenticated(authStatus);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public route - Login page */}
          <Route path="/" element={<Login />} />
          
          {/* Protected routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Task Management Routes */}
          <Route 
            path="/tasks" 
            element={
              <ProtectedRoute>
                <TaskList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create-task" 
            element={
              <ProtectedRoute>
                <CreateTask />
              </ProtectedRoute>
            } 
          />
          
          {/* Inventory Management Routes */}
          <Route 
            path="/inventory/devices" 
            element={
              <ProtectedRoute>
                <InventoryList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/inventory/add" 
            element={
              <ProtectedRoute>
                <AddDevice />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/inventory/update" 
            element={
              <ProtectedRoute>
                <UpdateDevice />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/inventory/update/:id" 
            element={
              <ProtectedRoute>
                <UpdateDevice />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/inventory/delete" 
            element={
              <ProtectedRoute>
                <DeleteDevice />
              </ProtectedRoute>
            } 
          />
          
          {/* Device Issuing Routes */}
          <Route 
            path="/issuing" 
            element={
              <ProtectedRoute>
                <IssuedDevList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/issuing/add" 
            element={
              <ProtectedRoute>
                <AddIssuing />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/issuing/status" 
            element={
              <ProtectedRoute>
                <UpdateIssuingStatus />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/issuing/status/:id" 
            element={
              <ProtectedRoute>
                <UpdateIssuingStatus />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch-all route - redirect authenticated users to dashboard */}
          <Route 
            path="*" 
            element={
              checkAuthentication() ? 
                <Navigate to="/dashboard" replace /> : 
                <Navigate to="/" replace />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;