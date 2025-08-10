

import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedCourses from '../components/features/FeaturedCourses';
import LearningPaths from '../components/features/LearningPaths';
import FeaturedBlogPosts from '../components/features/FeaturedBlogPosts';
import { LearningPath, Course, BlogPost } from '../types';

interface HomePageProps {
    onSelectCourse: (courseId: string) => void;
    onSelectPath: (pathId: string) => void;
    onNavigate: (pageName: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
    onSelectBlogPost: (postId: string) => void;
    learningPaths: LearningPath[];
    proCourses: Course[];
    freeCourses: Course[];
    blogPosts: BlogPost[];
}

const HomePage: React.FC<HomePageProps> = ({ 
    onSelectCourse, 
    onSelectPath, 
    onNavigate, 
    onSelectBlogPost,
    learningPaths,
    proCourses,
    freeCourses,
    blogPosts
}) => (
    <>
        <HeroSection />
        <div className="mt-8">
            <FeaturedCourses 
                onSelectCourse={onSelectCourse} 
                onNavigate={onNavigate} 
                proCourses={proCourses}
                freeCourses={freeCourses}
            />
            <LearningPaths 
                onNavigate={() => onNavigate('learning-paths')} 
                onSelectPath={onSelectPath}
                learningPaths={learningPaths} 
            />
            <FeaturedBlogPosts 
                onNavigate={(e) => onNavigate('blog', e)} 
                onSelectBlogPost={onSelectBlogPost}
                blogPosts={blogPosts}
            />
        </div>
    </>
);

export default HomePage;