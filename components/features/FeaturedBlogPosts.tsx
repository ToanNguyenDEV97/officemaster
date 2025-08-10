

import React from 'react';
import type { BlogPost } from '../../types';
import CourseCard from '../cards/CourseCard';
import SectionHeader from '../ui/SectionHeader';

interface FeaturedBlogPostsProps {
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onSelectBlogPost: (id: string) => void;
  blogPosts: BlogPost[];
}

const FeaturedBlogPosts: React.FC<FeaturedBlogPostsProps> = ({ onNavigate, onSelectBlogPost, blogPosts }) => {
  return (
    <section className="py-12">
      <SectionHeader title="Blog & Mẹo Hay" viewAllLink="#" onViewAllClick={onNavigate} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {blogPosts.slice(0, 5).map((post) => (
          <CourseCard key={post.id} item={post} onSelectBlogPost={onSelectBlogPost} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedBlogPosts;