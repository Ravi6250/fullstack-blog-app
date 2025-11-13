import React, { useState, useEffect, useCallback } from 'react';
import api from '../api';
import PostCard from '../components/PostCard';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearch, setActiveSearch] = useState('');

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get(`/posts?page=${currentPage}&search=${activeSearch}`);
      
      // --- THIS IS THE FIX ---
      // We now provide a fallback to an empty array `[]`.
      // If `res.data.posts` is undefined or null, `posts` will be set to `[]` instead of crashing.
      setPosts(res.data.posts || []);
      
      setTotalPages(res.data.totalPages || 0);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setError('Failed to load blog posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [currentPage, activeSearch]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setActiveSearch(searchTerm);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Latest Posts</h1>
      
      <form onSubmit={handleSearch} className="max-w-md mx-auto mb-12">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or author..."
            className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-r-full hover:bg-indigo-700"
          >
            Search
          </button>
        </div>
      </form>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500 text-center mt-8">{error}</p>
      ) : posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <p className="text-center text-gray-500 text-xl">
          No posts found. Why not create the first one?
        </p>
      )}
    </div>
  );
};

export default Home;