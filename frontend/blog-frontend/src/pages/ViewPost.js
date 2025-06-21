// pages/ViewPost.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

const ViewPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({ post: null, comments: [] });
  const [comment, setComment] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Fetch post and comments
    API.get(`/posts/${id}`).then((res) => {
      setData({ post: res.data.post, comments: res.data.comments });
    });

    // Fetch current user profile
    const token = localStorage.getItem('token');
    if (token) {
      API.get('/auth/profile')
        .then(res => setCurrentUser(res.data.user))
        .catch(err => console.error("Could not fetch user profile", err));
    }
  }, [id]);

  const handleComment = async () => {
    await API.post(`/posts/${id}/comments`, { content: comment });
    window.location.reload();
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await API.delete(`/posts/${id}`);
        alert('Post deleted successfully');
        navigate('/');
      } catch (err) {
        console.error('Error deleting post:', err);
        alert('Failed to delete the post.');
      }
    }
  };

  if (!data.post) return <div className="min-h-screen flex items-center justify-center"><p className="text-xl text-gray-500">Loading...</p></div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">
        <div className="flex justify-between items-start">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">{data.post.title}</h2>
          {currentUser && data.post.author && currentUser._id === data.post.author._id && (
            <button
              onClick={handleDelete}
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:from-red-600 hover:to-pink-600 transition-all"
            >
              Delete
            </button>
          )}
        </div>
        <p className="text-gray-700 text-lg leading-relaxed mb-10">{data.post.content}</p>

        <h4 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-200 pb-3 mb-6">Comments</h4>
        <div className="space-y-6">
          {data.comments.map((c) => (
            <div key={c._id} className="bg-gray-100 rounded-lg p-4 flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                {c.user.name.charAt(0)}
              </div>
              <div>
                <b className="text-gray-800">{c.user.name}</b>
                <p className="text-gray-600">{c.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <textarea 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
            placeholder="Write a comment..."
            className="w-full border-2 border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <button 
            onClick={handleComment} 
            className="mt-4 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all"
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
