
import React from 'react';
import { blogPosts } from '../data/content';
import CourseCard from './CourseCard';
import SectionHeader from './SectionHeader';

interface FeaturedBlogPostsProps {
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const FeaturedBlogPosts: React.FC<FeaturedBlogPostsProps> = ({ onNavigate }) => {
  return (
    <section className="py-12">
      <SectionHeader title="Blog & Mẹo Hay" viewAllLink="#" onViewAllClick={onNavigate} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {blogPosts.slice(0, 5).map((post) => (
          <CourseCard key={post.id} item={post} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedBlogPosts;
