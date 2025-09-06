// src/components/DeleteDevice.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchDevices, deleteDevice } from '../services/api';
import './DeleteDevice.css';

const DeleteDevice = () => {
    const navigate = useNavigate();
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deleting, setDeleting] = useState(null);

    useEffect(() => {
        const loadDevices = async () => {
            try {
                const fetchedDevices = await fetchDevices();
                const sortedDevices = fetchedDevices.sort((a, b) => a.device_id - b.device_id);
                setDevices(sortedDevices);
            } catch (error) {
                setError('Failed to fetch devices');
                console.error('Error fetching devices:', error);
            } finally {
                setLoading(false);
            }
        };

        loadDevices();
    }, []);

    const handleDeleteDevice = async (deviceId, deviceName) => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete device "${deviceName}"? This action cannot be undone.`
        );

        if (confirmDelete) {
            setDeleting(deviceId);
            try {
                await deleteDevice(deviceId);
                setDevices(devices.filter(device => device.device_id !== deviceId));
                setError('');
            } catch (error) {
                setError('Failed to delete device');
                console.error('Error deleting device:', error);
            } finally {
                setDeleting(null);
            }
        }
    };

    const handleBackToDashboard = () => {
        navigate('/dashboard');
    };

    if (loading) return (
        <div className="delete-device-container">
            <button className="back-button" onClick={handleBackToDashboard} title="Back to Dashboard">
                ←
            </button>
            <p>Loading devices...</p>
        </div>
    );

    if (error) return (
        <div className="delete-device-container">
            <button className="back-button" onClick={handleBackToDashboard} title="Back to Dashboard">
                ←
            </button>
            <p className="error-message">{error}</p>
        </div>
    );

    return (
        <div className="delete-device-container">
            <button className="back-button" onClick={handleBackToDashboard} title="Back to Dashboard">
                ←
            </button>
            <h2>Delete Devices</h2>
            <div className="warning-message">
                <strong>Warning:</strong> Deleting a device is permanent and cannot be undone. 
                Please make sure the device is not currently issued before deletion.
            </div>
            
            {devices.length === 0 ? (
                <p>No devices available for deletion.</p>
            ) : (
                <div className="devices-list">
                    {devices.map(device => (
                        <div key={device.device_id} className="device-card">
                            <div className="device-info">
                                <h3>{device.device_name}</h3>
                                <p><strong>ID:</strong> {device.device_id}</p>
                                <p><strong>Serial Number:</strong> {device.serial_number}</p>
                                <p><strong>Type:</strong> {device.device_type}</p>
                                <p><strong>Manufacturer:</strong> {device.manufacturer}</p>
                                <p><strong>Description:</strong> {device.description}</p>
                                <p><strong>Created:</strong> {device.created_at}</p>
                            </div>
                            <div className="device-actions">
                                <button 
                                    className="delete-button"
                                    onClick={() => handleDeleteDevice(device.device_id, device.device_name)}
                                    disabled={deleting === device.device_id}
                                >
                                    {deleting === device.device_id ? 'Deleting...' : 'Delete Device'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DeleteDevice;