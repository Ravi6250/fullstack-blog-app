import React, { useState, useEffect, useContext } from 'react';
import api from '../api';
import AuthContext from '../context/AuthContext';
import PostCard from '../components/PostCard';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user) return;
      try {
        const res = await api.get('/posts/my-posts');
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch user posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">My Posts</h1>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center">
            <p className="text-gray-500 text-xl mb-4">
            You haven't created any posts yet.
            </p>
            <Link to="/posts/new" className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition font-semibold">
                Create Your First Post
            </Link>
        </div>
      )}
    </div>
  );
};

export default MyPosts;