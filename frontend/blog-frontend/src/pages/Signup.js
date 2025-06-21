// pages/Signup.js
import React, { useState } from 'react';
import API from '../api';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', bio: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/signup', form);
      alert('User created successfully!');
      window.location.href = '/login';
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 font-sans">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 relative">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-2xl opacity-30 z-0"></div>
        <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8 z-10 relative">Sign Up</h2>
        <div className="flex flex-col gap-6 z-10 relative">
          <div className="relative">
            <input type="text" required placeholder=" " onChange={(e) => setForm({ ...form, name: e.target.value })} className="peer w-full border-b-2 border-gray-300 bg-transparent px-2 pt-6 pb-2 text-lg focus:border-blue-500 focus:outline-none transition" />
            <label className="absolute left-2 top-2 text-gray-400 text-base transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-focus:top-2 peer-focus:text-base pointer-events-none">Name</label>
          </div>
          <div className="relative">
            <input type="email" required placeholder=" " onChange={(e) => setForm({ ...form, email: e.target.value })} className="peer w-full border-b-2 border-gray-300 bg-transparent px-2 pt-6 pb-2 text-lg focus:border-blue-500 focus:outline-none transition" />
            <label className="absolute left-2 top-2 text-gray-400 text-base transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-focus:top-2 peer-focus:text-base pointer-events-none">Email</label>
          </div>
          <div className="relative">
            <input type="password" required placeholder=" " onChange={(e) => setForm({ ...form, password: e.target.value })} className="peer w-full border-b-2 border-gray-300 bg-transparent px-2 pt-6 pb-2 text-lg focus:border-blue-500 focus:outline-none transition" />
            <label className="absolute left-2 top-2 text-gray-400 text-base transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-focus:top-2 peer-focus:text-base pointer-events-none">Password</label>
          </div>
          <div className="relative">
            <input type="text" required placeholder=" " onChange={(e) => setForm({ ...form, bio: e.target.value })} className="peer w-full border-b-2 border-gray-300 bg-transparent px-2 pt-6 pb-2 text-lg focus:border-blue-500 focus:outline-none transition" />
            <label className="absolute left-2 top-2 text-gray-400 text-base transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-focus:top-2 peer-focus:text-base pointer-events-none">Bio</label>
          </div>
          <button type="submit" className="mt-6 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
