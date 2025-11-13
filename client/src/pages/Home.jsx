// client/src/pages/Home.jsx

import React, { useState, useEffect, useCallback } from 'react';
import api from '../api';
import PostCard from '../components/PostCard';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination'; // <-- Import Pagination

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // New state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // New state for search functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearch, setActiveSearch] = useState('');

  // We wrap fetchPosts in useCallback to prevent it from being recreated on every render
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      // Pass page and search term as query parameters to the API
      const res = await api.get(`/posts?page=${currentPage}&search=${activeSearch}`);
      
      setPosts(res.data.posts);
      setTotalPages(res.data.totalPages);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setError('Failed to load blog posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [currentPage, activeSearch]); // This function will re-run if currentPage or activeSearch changes

  // useEffect now calls the memoized fetchPosts function
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on a new search
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
      
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto mb-12">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or author..."
            className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 px-4 py-2 bg-blue-600 text-white font-semibold rounded-r-full hover:bg-blue-700"
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
          No posts found matching your search.
        </p>
      )}
    </div>
  );
};

export default Home;