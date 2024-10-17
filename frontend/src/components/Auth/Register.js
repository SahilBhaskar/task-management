import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); 

    const handleSubmit = async (e) => {
        e.preventDefault();

      
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match!');
            return;
        }

        try {
            await axios.post('http://localhost:8000/api/register', { email, password });
            console.log("Registered:", { email });
            setSuccessMessage('Registration successful! You can now login.');
            setEmail(''); 
            setPassword(''); 
            setConfirmPassword(''); 
        } catch (error) {
            if (error.response && error.response.data) {
                console.error('Registration failed:', error.response.data.message);
                setErrorMessage(error.response.data); // Set the error message from the response
            } else {
                console.error('Registration failed:', error);
                setErrorMessage('Registration failed. Please try again.');
            }
        }    
    };

    return (
        <div class="col-md-4 offset-md-4">
        <form onSubmit={handleSubmit} className="mt-4">
            <h2>Register</h2>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            {successMessage && (
                <div className="alert alert-success mt-3" role="alert">
                    {successMessage}
                </div>
            )}

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

            <div className="form-group">
                <label>Confirm Password:</label>
                <input
                    type="password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>

            <button type="submit" className="btn btn-primary mt-2">Register</button>
        </form>
        </div>
    );
};

export default Register;
