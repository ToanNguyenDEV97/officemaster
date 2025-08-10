
import React from 'react';
import type { BlogPost } from '../../types';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-slate-200">
      <a href="#" className="block">
        <img className="w-full h-40 object-cover" src={post.imageUrl} alt={post.title} />
        <div className="p-4">
          <h3 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors duration-300 h-12">
            {post.title}
          </h3>
          <div className="flex items-center text-sm text-slate-500 mt-4">
            <img className="w-8 h-8 rounded-full mr-3 object-cover" src={post.avatarUrl} alt={post.author} />
            <span>{post.author}</span>
          </div>
        </div>
      </a>
    </div>
  );
};

export default BlogPostCard;
