import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api';
import AuthContext from '../context/AuthContext';
import Loader from '../components/Loader';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        setError('Post not found or an error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await api.delete(`/posts/${id}`);
        toast.success('Post deleted successfully!');
        navigate('/');
      } catch (err) {
        toast.error('Failed to delete the post. Please try again.');
      }
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-center mt-8">{error}</p>;
  if (!post) return <p className="text-center mt-8">Post not found.</p>;

  const isAuthor = user && user.userId === post.author;
  const defaultImage = 'https://via.placeholder.com/800x400.png?text=Blog+Post';

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex items-center text-gray-500 mb-6">
          <span>By <span className="font-semibold text-blue-600">{post.username}</span></span>
          <span className="mx-2">•</span>
          <span>{format(new Date(post.createdAt), 'MMMM d, yyyy')}</span>
        </div>

        {isAuthor && (
          <div className="flex space-x-4 mb-6 border-b pb-4">
            <Link
              to={`/edit/${post._id}`}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 text-sm font-medium"
            >
              Edit Post
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm font-medium"
            >
              Delete Post
            </button>
          </div>
        )}

        <img
          src={post.imageURL || defaultImage}
          alt={post.title}
          className="w-full h-auto max-h-[500px] object-cover rounded-lg mb-8"
        />
        
        <div className="prose max-w-none text-gray-800 text-lg leading-relaxed">
          <p className="whitespace-pre-wrap">{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;