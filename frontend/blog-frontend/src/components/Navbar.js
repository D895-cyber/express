import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            API.get('/auth/profile')
                .then(res => setUser(res.data.user))
                .catch(() => {
                    localStorage.removeItem('token');
                    setUser(null);
                });
        }
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">BlogApp</Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <span className="text-gray-700">Welcome, {user.name}!</span>
                                <Link to="/add" className="text-gray-600 hover:text-blue-500 transition">Add Post</Link>
                                <button onClick={handleLogout} className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:from-red-600 hover:to-pink-600 transition-all">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-600 hover:text-blue-500 transition">Login</Link>
                                <Link to="/signup" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 transition-all">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
