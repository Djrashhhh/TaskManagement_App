// Updated TaskList.js
import React, { useEffect, useState } from 'react';
import { fetchTasks, updateTaskDetails } from '../services/api'; // Updated import
import { useNavigate } from 'react-router-dom';
import './TaskList.css';

const TaskList = () => {
   const navigate = useNavigate();
   const [tasks, setTasks] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState('');
   const [updatedTask, setUpdatedTask] = useState({});

   useEffect(() => {
       const loadTasks = async () => {
           try {
               const response = await fetchTasks();
               const sortedTasks = response.data.sort((a, b) => a.id - b.id);
               setTasks(sortedTasks);
           } catch (error) {
               setError('Failed to fetch tasks');
               console.error('Error fetching tasks:', error);
           } finally {
               setLoading(false);
           }
       };

       loadTasks();
   }, []);

   const handleStatusChange = (taskId, newStatus) => {
       setUpdatedTask(prev => ({
           ...prev,
           [taskId]: { ...prev[taskId], status: newStatus }
       }));
   };

   const handleDescriptionChange = (taskId, newDescription) => {
       setUpdatedTask(prev => ({
           ...prev,
           [taskId]: { ...prev[taskId], description: newDescription }
       }));
   };

   const handleSaveChanges = async () => {
       if (Object.keys(updatedTask).length > 0) {
           try {
               const userToken = JSON.parse(localStorage.getItem('TOKEN') || '{}');
               const roleId = userToken.role?.roleId;

               if (!roleId) {
                   setError('User role not found. Please log in again.');
                   return;
               }

               // Process each updated task
               for (const [taskId, updates] of Object.entries(updatedTask)) {
                   await updateTaskDetails(taskId, {
                       description: updates.description,
                       status: updates.status,
                       roleId: roleId
                   });
               }

               // Refresh tasks list
               const response = await fetchTasks();
               setTasks(response.data);
               setUpdatedTask({});
               setError('');
           } catch (error) {
               setError('Failed to save changes');
               console.error('Error saving changes:', error);
           }
       }
   };

   const handleBackToDashboard = () => {
       navigate('/dashboard');
   };

   if (loading) return (
       <div className="tasklist-container">
           <button className="back-button" onClick={handleBackToDashboard} title="Back to Dashboard">
               ←
           </button>
           <p>Loading...</p>
       </div>
   );

   if (error) return (
       <div className="tasklist-container">
           <button className="back-button" onClick={handleBackToDashboard} title="Back to Dashboard">
               ←
           </button>
           <p className="error-message">{error}</p>
       </div>
   );

   return (
       <div className="tasklist-container">
           <button className="back-button" onClick={handleBackToDashboard} title="Back to Dashboard">
               ←
           </button>
           <h2>All Tasks</h2>
           {tasks.length === 0 ? (
               <p>No tasks found.</p>
           ) : (
               <>
                   <table>
                       <thead>
                           <tr>
                               <th>Task ID</th>
                               <th>Description</th>
                               <th>Created By</th>
                               <th>Created At</th>
                               <th>Assigned To</th>
                               <th>Status</th>
                               <th>Priority Level</th>
                               <th>Updated By</th>
                               <th>Updated At</th>
                           </tr>
                       </thead>
                       <tbody>
                           {tasks.map(task => (
                               <tr key={task.id}>
                                   <td>{task.id}</td>
                                   <td>
                                       <input
                                           type="text"
                                           value={updatedTask?.[task.id]?.description ?? task.description}
                                           onChange={(e) => handleDescriptionChange(task.id, e.target.value)}
                                       />
                                   </td>
                                   <td>{task.createdBy}</td>
                                   <td>{task.createdAt}</td>
                                   <td>{task.assignedTo}</td>
                                   <td>
                                       <select
                                           value={updatedTask?.[task.id]?.status ?? task.status}
                                           onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                       >
                                           <option value="pending">Pending</option>
                                           <option value="in progress">In Progress</option>
                                           <option value="completed">Completed</option>
                                       </select>
                                   </td>
                                   <td>{task.priorityLevel}</td>
                                   <td>{task.updatedBy}</td>
                                   <td>{task.updatedAt}</td>
                               </tr>
                           ))}
                       </tbody>
                   </table>
                   <button onClick={handleSaveChanges} className="save-changes-button">
                       Save Changes
                   </button>
               </>
           )}
       </div>
   );
};

export default TaskList;