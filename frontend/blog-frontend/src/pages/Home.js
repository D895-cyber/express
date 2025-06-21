// pages/Home.js
import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    API.get('/posts').then((res) => setPosts(res.data.posts));
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">All Posts</h1>
        <div className="mb-10 relative">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-3 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <svg className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div key={post._id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col">
              <div className="p-6 flex-grow">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{post.content.slice(0, 100)}...</p>
                <Link to={`/post/${post._id}`} className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 transition-all">
                  Read More
                </Link>
              </div>
              <div className="bg-gray-50 p-4 border-t border-gray-100">
                {post.author ? (
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      {post.author.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-semibold text-gray-800">{post.author.name}</p>
                      <p className="text-xs text-gray-500">Author</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-lg">?</div>
                    <div className="ml-3">
                      <p className="text-sm font-semibold text-gray-800">Anonymous</p>
                      <p className="text-xs text-gray-500">Author</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
