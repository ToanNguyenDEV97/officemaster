

import React, { useState, useEffect, useMemo, createRef } from 'react';
import { BlogPost, Heading, User } from '../types';
import { instructors } from '../data/instructors';
import SectionHeader from '../components/ui/SectionHeader';
import CourseCard from '../components/cards/CourseCard';

// Markdown and Syntax Highlighting imports
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

// Shared & Page-specific Components
import Breadcrumbs from '../components/ui/Breadcrumbs';
import ReadingProgress from '../components/blog/ReadingProgress';
import TableOfContents from '../components/blog/TableOfContents';
import AuthorCard from '../components/cards/AuthorCard';
import CodeBlock from '../components/ui/CodeBlock';
import NewsletterCTA from '../components/ui/NewsletterCTA';
import MobileTableOfContents from '../components/blog/MobileTableOfContents';
import SocialShare from '../components/blog/SocialShare';
import CommentsSection from '../components/comments/CommentsSection';

// Props
interface BlogDetailPageProps {
    post: BlogPost;
    allPosts: BlogPost[];
    onNavigate: (pageId: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
    onSelectBlogPost: (postId: string) => void;
    currentUser: User | null;
    onOpenAuthModal: () => void;
}

// Helper function to create a slug
const createSlug = (text: string) => {
    return text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
};


// Main Page Component
const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ post, allPosts, onNavigate, onSelectBlogPost, currentUser, onOpenAuthModal }) => {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState('');
    const contentRef = createRef<HTMLDivElement>();

    const authorDetails = useMemo(() => Object.values(instructors).find(inst => inst.name === post.author), [post.author]);
    const relatedPosts = useMemo(() => allPosts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 5), [post, allPosts]);
    
    // Extract headings from markdown content
    useEffect(() => {
        const regex = /^(##|###)\s(.+)/gm;
        const matches = Array.from(post.content.matchAll(regex));
        const extractedHeadings = matches.map(match => ({
            level: match[1].length,
            text: match[2].trim(),
            id: createSlug(match[2].trim())
        }));
        setHeadings(extractedHeadings);
    }, [post.content]);

    // Track active heading on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-30% 0px -70% 0px' }
        );
    
        const headingElements = headings.map(({ id }) => document.getElementById(id)).filter(el => el);
        headingElements.forEach(el => observer.observe(el));
    
        return () => {
            headingElements.forEach(el => {
                if(el) observer.unobserve(el)
            });
        }
    }, [headings]);


    const breadcrumbItems = [
        { label: 'Trang chủ', action: (e: React.MouseEvent<HTMLAnchorElement>) => onNavigate('home', e) },
        { label: 'Blog', action: (e: React.MouseEvent<HTMLAnchorElement>) => onNavigate('blog', e) },
        { label: post.title, action: null }
    ];

    return (
        <>
            <ReadingProgress target={contentRef} />
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800" ref={contentRef}>
                <div className="p-4 md:p-6 lg:p-8">
                    <Breadcrumbs items={breadcrumbItems} className="mb-6" />

                    {/* Main content with TOC */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 xl:gap-x-12">
                        {/* Article */}
                        <div className="lg:col-span-8">
                            <header className="mb-6">
                                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('blog'); }} className="text-indigo-600 dark:text-indigo-400 uppercase font-semibold text-sm tracking-wide hover:underline">{post.category}</a>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 dark:text-slate-100 my-3 leading-tight">{post.title}</h1>
                                <div className="flex items-center mt-4">
                                    <img src={post.avatarUrl} alt={post.author} className="w-12 h-12 rounded-full object-cover mr-4" />
                                    <div>
                                        <p className="font-semibold text-slate-700 dark:text-slate-200">{post.author}</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{post.publishedDate}</p>
                                    </div>
                                </div>
                            </header>

                            <MobileTableOfContents headings={headings} />

                            <figure className="my-6 md:my-8">
                                <img src={post.imageUrl} alt={post.title} className="w-full h-auto object-cover rounded-lg shadow-lg" />
                            </figure>
                            
                            <article className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none prose-h2:scroll-mt-24 prose-h3:scroll-mt-24 prose-headings:font-bold prose-headings:text-slate-800 dark:prose-headings:text-slate-100 prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-700">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeSlug]}
                                    components={{ code: CodeBlock }}
                                >
                                    {post.content}
                                </ReactMarkdown>
                            </article>
                            
                            {authorDetails && (
                                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
                                    <AuthorCard author={authorDetails} heading="Về tác giả" />
                                </div>
                            )}

                            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
                                <CommentsSection 
                                    postId={post.id} 
                                    currentUser={currentUser} 
                                    onOpenAuthModal={onOpenAuthModal} 
                                />
                            </div>

                            <NewsletterCTA />

                        </div>
                        
                        {/* TOC Sidebar */}
                        <aside className="hidden lg:block lg:col-span-4">
                            <div className="sticky top-24 space-y-6">
                               <TableOfContents headings={headings} activeId={activeId} />
                               <SocialShare post={post} />
                            </div>
                        </aside>
                    </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className="bg-slate-50/70 dark:bg-slate-950/50 p-6 md:p-8 rounded-b-xl border-t border-slate-200 dark:border-slate-800">
                        <SectionHeader title="Bài viết liên quan" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {relatedPosts.map(p => (
                                <CourseCard key={p.id} item={p} onSelectBlogPost={onSelectBlogPost} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default BlogDetailPage;