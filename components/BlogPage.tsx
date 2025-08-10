
import React, { useState, useMemo } from 'react';
import { blogPosts } from '../data/content';
import CourseCard from './CourseCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const POSTS_PER_PAGE = 9;
const CATEGORIES = ['Tất cả', 'Excel', 'Word', 'PowerPoint', 'Mẹo Chung'];

const BlogPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('Tất cả');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredPosts = useMemo(() => {
        if (activeCategory === 'Tất cả') {
            return blogPosts;
        }
        return blogPosts.filter(post => post.category === activeCategory);
    }, [activeCategory]);

    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const currentPosts = filteredPosts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    );

    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
        setCurrentPage(1); // Reset to first page on category change
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Blog & Mẹo Hay</h1>
                <p className="mt-2 text-slate-600 max-w-2xl">Nơi chia sẻ kiến thức, mẹo vặt và những câu chuyện thú vị xoay quanh thế giới tin học văn phòng.</p>
            </div>

            {/* Category Filters */}
            <div className="flex justify-center flex-wrap gap-2 md:gap-3 mb-8 border-t border-b border-slate-200 py-4">
                {CATEGORIES.map(category => (
                    <button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
                            activeCategory === category
                                ? 'bg-indigo-600 text-white shadow'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Posts Grid */}
            {currentPosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentPosts.map(post => (
                        <CourseCard key={post.id} item={post} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-slate-500">Không tìm thấy bài viết nào trong chuyên mục này.</p>
                </div>
            )}


            {/* Pagination */}
            {totalPages > 1 && (
                 <nav className="flex items-center justify-center gap-4 mt-12 pt-6 border-t border-slate-200" aria-label="Pagination">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <FaChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                            <button
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                                className={`w-10 h-10 rounded-full font-semibold text-sm transition-colors ${
                                    currentPage === pageNumber 
                                    ? 'bg-indigo-600 text-white shadow' 
                                    : 'bg-white text-slate-600 hover:bg-slate-100'
                                }`}
                            >
                                {pageNumber}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <FaChevronRight className="w-4 h-4" />
                    </button>
                </nav>
            )}
        </div>
    );
};

export default BlogPage;
