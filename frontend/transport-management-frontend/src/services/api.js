// src/services/api.js
import axios from 'axios';

// Use environment variable or fallback to localhost
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('TOKEN');
    if (token) {
      try {
        const parsedToken = JSON.parse(token);
        // Add authorization header if token exists
        config.headers.Authorization = `Bearer ${parsedToken.token || parsedToken}`;
      } catch (error) {
        console.error('Error parsing token:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('TOKEN');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Authentication functions
export const loginUser = (user) => apiClient.post('/login', user);

// Task functions
export const fetchTasks = () => apiClient.get('/tasks');
export const createTask = (task) => apiClient.post('/tasks', task);
export const updateTaskDetails = async (taskId, params) => {
  try {
    const { description, status, roleId } = params;
    let queryParams = `roleId=${roleId}`;
    
    if (description !== undefined) {
      queryParams += `&description=${encodeURIComponent(description)}`;
    }
    if (status !== undefined) {
      queryParams += `&status=${encodeURIComponent(status)}`;
    }
    
    const response = await apiClient.put(`/tasks/${taskId}/details?${queryParams}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update task details');
  }
};

// Device/Inventory functions
export const fetchDevices = async () => {
  try {
    const response = await apiClient.get('/inventory');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch devices');
  }
};

export const addDevice = async (deviceData) => {
  try {
    const response = await apiClient.post('/inventory', deviceData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add device');
  }
};

export const updateDevice = async (deviceId, updatedDevice) => {
  try {
    const response = await apiClient.put(`/inventory/${deviceId}`, updatedDevice);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update device');
  }
};

export const deleteDevice = async (deviceId) => {
  try {
    await apiClient.delete(`/inventory/${deviceId}`);
  } catch (error) {
    throw new Error('Failed to delete device');
  }
};

// Issuing functions
export const fetchIssuedDevices = async () => {
  try {
    const response = await apiClient.get('/issuing');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch issued devices');
  }
};

export const createIssuing = async (issuingData) => {
  try {
    const response = await apiClient.post('/issuing', issuingData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create issuing');
  }
};

export const updateIssuingStatus = async (id, status) => {
  try {
    const response = await apiClient.put(`/issuing/${id}/status`, { status });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update issuing status');
  }
};

export default apiClient;