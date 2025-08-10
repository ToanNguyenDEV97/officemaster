

import React, { useState, useCallback } from 'react';
import { ForumTopic, ForumReply, User, ForumCategory } from '../types';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import ReplyCard from '../components/forum/ReplyCard';
import { FaUser, FaCalendarAlt, FaComments } from 'react-icons/fa';
import TimeAgo from 'react-timeago';
import viStrings from 'react-timeago/lib/language-strings/vi';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

const formatter = buildFormatter(viStrings);

interface ForumTopicDetailPageProps {
    topic: ForumTopic;
    replies: ForumReply[];
    users: User[];
    categories: ForumCategory[];
    onNavigate: (pageId: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
    currentUser: User | null;
    onOpenAuthModal: () => void;
}

const ForumTopicDetailPage: React.FC<ForumTopicDetailPageProps> = ({ topic, replies, users, categories, onNavigate, currentUser, onOpenAuthModal }) => {
    
    const findUserById = useCallback((id: string) => {
        return users.find(u => u.id === id);
    }, [users]);
    
    const author = findUserById(topic.authorId);
    const category = categories.find(c => c.id === topic.categoryId);

    const [allReplies, setAllReplies] = useState(replies);

    const handleAddReply = (content: string) => {
        if (!currentUser) return;
        const newReply: ForumReply = {
            id: String(Date.now()),
            topicId: topic.id,
            authorId: currentUser.id,
            content,
            createdAt: new Date().toISOString(),
            upvotes: 0,
        };
        setAllReplies(prev => [...prev, newReply]);
    };

    const breadcrumbItems = [
        { label: 'Trang chủ', action: (e: React.MouseEvent<HTMLAnchorElement>) => onNavigate('home', e) },
        { label: 'Diễn đàn', action: (e: React.MouseEvent<HTMLAnchorElement>) => onNavigate('forum', e) },
        { label: category?.name || 'Chủ đề', action: null }
    ];

    return (
        <div className="space-y-6">
            <Breadcrumbs items={breadcrumbItems} />
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 md:p-8">
                {/* Topic Header */}
                <header className="pb-6 border-b border-slate-200 dark:border-slate-700">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100 leading-tight">{topic.title}</h1>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400 mt-4">
                        <span className="flex items-center gap-2"><FaUser /> {author?.name || 'Vô danh'}</span>
                        <span className="flex items-center gap-2"><FaCalendarAlt /> <TimeAgo date={topic.createdAt} formatter={formatter} /></span>
                        <span className="flex items-center gap-2"><FaComments /> {topic.repliesCount} bình luận</span>
                        {category && <span className={`px-2 py-0.5 text-xs font-semibold text-white ${category.color} rounded-full`}>{category.name}</span>}
                    </div>
                </header>

                {/* Original Post */}
                <ReplyCard reply={{...topic, upvotes: 0, topicId: topic.id, authorId: topic.authorId}} isOriginalPost={true} findUserById={findUserById} />

                {/* Replies */}
                <div className="mt-8 space-y-6">
                    {allReplies.map(reply => (
                        <ReplyCard key={reply.id} reply={reply} findUserById={findUserById} />
                    ))}
                </div>

                {/* Reply Form */}
                <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Để lại bình luận</h3>
                    {currentUser ? (
                        <div className="flex items-start gap-4">
                            <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-11 h-11 rounded-full object-cover"/>
                             <form onSubmit={(e) => {
                                 e.preventDefault();
                                 const content = (e.target as any).elements.content.value;
                                 handleAddReply(content);
                                 (e.target as any).reset();
                             }} className="w-full">
                                <textarea
                                    id="content"
                                    name="content"
                                    rows={5}
                                    required
                                    placeholder="Viết bình luận của bạn tại đây..."
                                    className="block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                ></textarea>
                                <button type="submit" className="mt-3 bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-indigo-700 transition-colors">Gửi bình luận</button>
                            </form>
                        </div>
                    ) : (
                         <div className="text-center p-5 bg-slate-100 rounded-lg">
                            <p className="text-slate-700">Bạn cần đăng nhập để để lại bình luận.</p>
                            <button onClick={onOpenAuthModal} className="mt-2 text-indigo-600 font-semibold hover:underline">Đăng nhập ngay</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForumTopicDetailPage;