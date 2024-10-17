import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Auth/login';
import Register from './components/Auth/Register';
import TaskDashboard from './components/Task/TaskDashboard';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const handleLogin = (username) => {
        console.log('User logged in:', username);
        setIsLoggedIn(true);
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <Router>
           <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
               
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                    {!isLoggedIn ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/tasks">Tasks</Link>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                            </li>
                        </>
                    )}
                    </ul>
                </div>
            </nav>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Login onLogin={handleLogin} />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/tasks" element={isLoggedIn ? <TaskDashboard /> : <Login onLogin={handleLogin} />} />
                </Routes>
            </div>
          </div>  
        </Router>
    );
};

export default App;
