// pages/AddPost.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const AddPost = () => {
  const [form, setForm] = useState({ title: '', content: '', tags: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/posts', {
        ...form,
        tags: form.tags.split(',').map(tag => tag.trim()),
      });
      alert('Post added successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error creating post:', err);
      alert('Error creating post');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-24 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-2xl opacity-40 z-0"></div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8 z-10 relative">Create a New Post</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 z-10 relative">
            <div className="relative">
              <input type="text" required placeholder=" " onChange={(e) => setForm({ ...form, title: e.target.value })} className="peer w-full border-b-2 border-gray-300 bg-transparent px-2 pt-6 pb-2 text-lg focus:border-blue-500 focus:outline-none transition" />
              <label className="absolute left-2 top-2 text-gray-400 text-base transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-focus:top-2 peer-focus:text-base pointer-events-none">Title</label>
            </div>
            <div className="relative">
              <textarea required placeholder=" " onChange={(e) => setForm({ ...form, content: e.target.value })} className="peer w-full border-b-2 border-gray-300 bg-transparent px-2 pt-6 pb-2 text-lg focus:border-blue-500 focus:outline-none transition resize-none h-32" />
              <label className="absolute left-2 top-2 text-gray-400 text-base transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-focus:top-2 peer-focus:text-base pointer-events-none">Content</label>
            </div>
            <div className="relative">
              <input type="text" required placeholder=" " onChange={(e) => setForm({ ...form, tags: e.target.value })} className="peer w-full border-b-2 border-gray-300 bg-transparent px-2 pt-6 pb-2 text-lg focus:border-blue-500 focus:outline-none transition" />
              <label className="absolute left-2 top-2 text-gray-400 text-base transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-focus:top-2 peer-focus:text-base pointer-events-none">Tags (comma separated)</label>
            </div>
            <button type="submit" className="mt-6 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200">Add Post</button>
          </form>
        </div>

        {/* Right Column: Informative/Decorative Elements */}
        <div className="space-y-8">
          {/* 3D Progress/Step Indicator */}
          <div className="flex justify-center items-center gap-4 sm:gap-6 p-4 bg-white/50 rounded-2xl shadow-lg backdrop-blur-sm">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full shadow-2xl flex items-center justify-center text-white text-xl font-bold border-4 border-blue-300 [transform:scale(1.1)] animate-pulse">1</div>
              <span className="mt-2 text-blue-700 font-semibold text-sm">Start</span>
            </div>
            <div className="w-12 sm:w-16 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-md"></div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-blue-100 rounded-full shadow-xl flex items-center justify-center text-blue-400 text-xl font-bold border-4 border-blue-100">2</div>
              <span className="mt-2 text-blue-400 font-semibold text-sm">Write</span>
            </div>
            <div className="w-12 sm:w-16 h-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full shadow-md"></div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-purple-100 rounded-full shadow-xl flex items-center justify-center text-purple-400 text-xl font-bold border-4 border-purple-100">3</div>
              <span className="mt-2 text-purple-400 font-semibold text-sm">Submit</span>
            </div>
          </div>

          {/* 3D Floating Info Panels */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
            <div className="h-28 bg-gradient-to-tr from-blue-400 to-purple-400 rounded-xl shadow-2xl flex flex-col items-center justify-center text-white font-semibold text-lg transform-gpu animate-float1 p-2 text-center">
              <span>📝 Write clearly</span>
              <span className="text-sm font-normal mt-1">Clear posts get more engagement.</span>
            </div>
            <div className="h-28 bg-gradient-to-tr from-purple-400 to-blue-400 rounded-xl shadow-2xl flex flex-col items-center justify-center text-white font-semibold text-lg transform-gpu animate-float2 p-2 text-center">
              <span>🏷️ Use tags</span>
              <span className="text-sm font-normal mt-1">Tags help others find your post.</span>
            </div>
            <div className="h-28 bg-gradient-to-tr from-pink-400 to-blue-400 rounded-xl shadow-2xl flex flex-col items-center justify-center text-white font-semibold text-lg transform-gpu animate-float3 p-2 text-center">
              <span>💬 Engage</span>
              <span className="text-sm font-normal mt-1">Reply to comments to grow your audience.</span>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes float1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes float2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes float3 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .animate-float1 { animation: float1 3s ease-in-out infinite; }
        .animate-float2 { animation: float2 3.5s ease-in-out infinite; }
        .animate-float3 { animation: float3 2.8s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default AddPost;
