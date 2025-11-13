import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';
import EditPost from './pages/EditPost';
import MyPosts from './pages/MyPosts';

function App() {
  return (
    <Router>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
      <div className="font-sans">
        <Header />
        <main className="bg-gray-100 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/posts/new" element={<CreatePost />} />
              <Route path="/edit/:id" element={<EditPost />} />
              <Route path="/my-posts" element={<MyPosts />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;