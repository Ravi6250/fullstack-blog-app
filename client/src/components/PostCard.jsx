import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const PostCard = ({ post }) => {
  const defaultImage = 'https://via.placeholder.com/400x200.png?text=Blog+Post';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link to={`/posts/${post._id}`}>
        <img 
          className="w-full h-56 object-cover" 
          src={post.imageURL || defaultImage} 
          alt={post.title} 
        />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2 text-gray-800 truncate" title={post.title}>
            {post.title}
          </h2>
          <p className="text-gray-600 mb-4 text-sm">
            By <span className="font-semibold text-indigo-600">{post.username}</span>
          </p>
          <p className="text-gray-700 text-base line-clamp-3">
            {post.content}
          </p>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <span className="text-sm text-gray-500">
            {format(new Date(post.createdAt), 'MMMM d, yy')}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;