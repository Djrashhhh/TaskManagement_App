// UpdateDevice.js - Updated with back button
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchDevices, updateDevice } from '../api'; // Ensure the path is correct
import './UpdateDevice.css'; // Ensure you have your styling file for the component

const UpdateDevice = () => {
    const navigate = useNavigate();
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editableDevices, setEditableDevices] = useState({}); // Track devices with editable fields

    useEffect(() => {
        const loadDevices = async () => {
            try {
                const fetchedDevices = await fetchDevices(); // Fetch devices from API
                setDevices(fetchedDevices);
                // Initialize editableDevices state
                const initialEditable = fetchedDevices.reduce((acc, device) => {
                    acc[device.device_id] = { ...device }; // Initialize with all device fields
                    return acc;
                }, {});
                setEditableDevices(initialEditable);
            } catch (error) {
                setError('Failed to fetch devices');
            } finally {
                setLoading(false);
            }
        };

        loadDevices();
    }, []);

    const handleFieldChange = (deviceId, field, value) => {
        setEditableDevices(prev => ({
            ...prev,
            [deviceId]: { ...prev[deviceId], [field]: value }
        }));
    };

    const handleSaveChanges = async () => {
        try {
            await Promise.all(
                Object.entries(editableDevices).map(([deviceId, updatedDevice]) => {
                    const { device_name, serial_number, device_type, manufacturer, description } = updatedDevice;
                    return updateDevice(deviceId, {  device_name, serial_number, device_type, manufacturer, description });
                })
            );
            // Refresh the device list
            const fetchedDevices = await fetchDevices();
            setDevices(fetchedDevices);
            setEditableDevices({});
        } catch (error) {
            console.error('Error while saving changes:', error); // Log detailed error
            setError('Failed to save changes');
        }
    };

    const handleBackToDashboard = () => {
        navigate('/dashboard'); // Adjust the path according to your routing setup
    };

    if (loading) return (
        <div className="inventory-list-container">
            <button className="back-button" onClick={handleBackToDashboard} title="Back to Dashboard">
                ←
            </button>
            <p>Loading...</p>
        </div>
    );

    if (error) return (
        <div className="inventory-list-container">
            <button className="back-button" onClick={handleBackToDashboard} title="Back to Dashboard">
                ←
            </button>
            <p>{error}</p>
        </div>
    );

    return (
        <div className="inventory-list-container">
            <button className="back-button" onClick={handleBackToDashboard} title="Back to Dashboard">
                ←
            </button>
            <h2>All Devices</h2>
            <table>
                <thead>
                    <tr>
                        <th>Device ID</th>
                        <th>Device Name</th>
                        <th>Serial Number</th>
                        <th>Device Type</th>
                        <th>Manufacturer</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {devices.map(device => (
                        <tr key={device.device_id}>
                            <td>{device.device_id}</td>
                          
                            <td>
                                <input
                                    type="text"
                                    value={editableDevices[device.device_id]?.device_name || device.device_name}
                                    onChange={(e) => handleFieldChange(device.device_id, 'device_name', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={editableDevices[device.device_id]?.serial_number || device.serial_number}
                                    onChange={(e) => handleFieldChange(device.device_id, 'serial_number', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={editableDevices[device.device_id]?.device_type || device.device_type}
                                    onChange={(e) => handleFieldChange(device.device_id, 'device_type', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={editableDevices[device.device_id]?.manufacturer || device.manufacturer}
                                    onChange={(e) => handleFieldChange(device.device_id, 'manufacturer', e.target.value)}
                                />
                            </td>
                            <td>{device.created_at}</td>
                            <td>{device.updated_at}</td>
                            <td>
                                <input
                                    type="text"
                                    value={editableDevices[device.device_id]?.description || device.description}
                                    onChange={(e) => handleFieldChange(device.device_id, 'description', e.target.value)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleSaveChanges} className="save-changes-button">Complete</button>
        </div>
    );
};

export default UpdateDevice;