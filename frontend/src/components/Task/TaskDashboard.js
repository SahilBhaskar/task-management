import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const TaskDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('');
    const [editTask, setEditTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/tasks', {
            headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
    };

    const addTask = async (task) => {
        const token = localStorage.getItem('token');
       
        try {
            const response = await axios.post('http://localhost:8000/api/tasks', task, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks([...tasks, response.data]);
            toast.success('Task Created Successfully!', { position: 'top-right' });
        } catch (error) {
            console.error('Error occurred:', error);
            if (error.response && error.response.data) {
                console.error('Error details:', error.response.data.message);
                toast.error(error.response.data.message);
            } else {
                console.error('Error occurred:', error);
                toast.error('Task creation failed. Please try again.');
            }
        }
    };
    
    const handleEditClick = (task) => {
        setEditTask(task);
    };

    const handleFormSubmit = (task) => {
        if (editTask) {
            updateTask({ ...task, id: editTask.id });
        } else {
            addTask(task);
        }
    };
    const deleteTask = async (id) => {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:8000/api/tasks/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(tasks.filter(task => task.id !== id));
        toast.success('Task Deleted Successfully!', { position: 'top-right' });
    };
    const updateTask = async (task) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`http://localhost:8000/api/tasks/${task.id}`, task, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setTasks(tasks.map(t => (t.id === task.id ? response.data : t)));
            setEditTask(null);
            toast.success('Task Updated Successfully!', { position: 'top-right' });
           
        } catch (error) {
            console.error('eror failed:', error);
            if (error.response && error.response.data) {
                console.error('Registration failed:', error.response.data.message);
                toast.error(error.response.data); // Set the error message from the response
            } else {
                console.error('Registration failed:', error);
                toast.error('Registration failed. Please try again.');
            }
        }
    };
    const filteredTasks = tasks.filter(task =>
        task.status.includes(filter) || task.due_date.includes(filter) || task.title.includes(filter) || task.description.includes(filter) 
    );

    return (
        <div className="mt-4 col-md-10 offset-md-1">
            <h2 class="mt-2 mb-2">Task Dashboard</h2>
            <ToastContainer />
            <div class="row col-md-4">
           
            </div>
            <div class="row">
            <TaskForm addTask={handleFormSubmit} editTask={editTask} setEditTask={setEditTask} />
            
            <input
                    type="text"
                    className="form-control mb-2 mt-2 col-md-4"
                    placeholder="Filter by status or due date title or description"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                 />
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
              
                    {filteredTasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.due_date}</td>
                            <td>{task.status}</td>
                            <td>{task.priority}</td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() => handleEditClick(task)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => deleteTask(task.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default TaskDashboard;
