import React, { useState, useEffect } from 'react';

const TaskForm = ({ addTask, editTask, setEditTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('');

    useEffect(() => {
        if (editTask) {
            setTitle(editTask.title);
            setDescription(editTask.description);
            setStatus(editTask.status);
            setDueDate(editTask.due_date);
            setPriority(editTask.priority);
        } else {
            setTitle('');
            setDescription('');
            setStatus('');
            setDueDate('');
            setPriority('');
        }
    }, [editTask]);

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setStatus('');
        setDueDate('');
        setPriority('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const task = { title, description, status, due_date: dueDate, priority };
        addTask(task, resetForm);
        setEditTask(null);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-3 mt-2">
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                className="form-control mb-2"
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
            />
            <input
                type="date"
                className="form-control mb-2"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
            />
            <input
                type="number"
                className="form-control mb-2"
                placeholder="Priority eg(1,2,3)"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
            />
            <button type="submit" className="btn btn-primary">{editTask ? 'Update Task' : 'Add Task'}</button>
            {editTask && (
                <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditTask(null)}>Cancel</button>
            )}
        </form>
    );
};

export default TaskForm;
