// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api'; // Ensure the path is correct
import './Login.css'; // Import the CSS file

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const user = { username, password };
      const response = await loginUser(user);
      console.log('User authenticated successfully:', response.data);
      localStorage.setItem('TOKEN', JSON.stringify(response.data));
      navigate('/dashboard'); // Redirect to dashboard after successful login
      
      //added for debugging purposes
      console.log('Stored TOKEN:', localStorage.getItem('TOKEN'));
      console.log('All localStorage items:', {...localStorage});
      const isAuthenticated = () => {
        const token = localStorage.getItem('TOKEN');
        console.log('Checking auth, TOKEN exists:', token !== null);
        return token !== null;
      };
    } catch (error) {
      setError('Invalid username or password');
      console.error('Error logging in:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background"></div>
      <div className="login-content">
        <div className="login-card">
          <div className="login-header">
            <h1 className="app-title">Task Tracking & Inventory Management App</h1>
            <p className="app-subtitle">Please sign in to your account</p>
          </div>
          
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
                placeholder="Enter your username"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                placeholder="Enter your password"
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;