// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import AddPost from './pages/AddPost';
import ViewPost from './pages/ViewPost';
import Navbar from './components/Navbar';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add" element={<AddPost />} />
      <Route path="/post/:id" element={<ViewPost />} />
    </Routes>
  </BrowserRouter>
);

export default App;
