import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login', { email, password });
            localStorage.setItem('token', response.data.token); 
            onLogin(email);
            toast.success('Login successful!', { position: 'top-right' });
            navigate('/tasks');
        } catch (error) {
            console.error('Login failed:', error);
            toast.error('Login failed. Please check your credentials.', { position: 'top-right' });
        }
    };

    return (
        <div class="col-md-4 offset-md-4">
            <form onSubmit={handleSubmit} className="mt-4">
                <h2>Login</h2>
                <div className="form-group">
                    <label>Email:</label> 
                    <input
                        type="email" 
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-2">Login</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;
