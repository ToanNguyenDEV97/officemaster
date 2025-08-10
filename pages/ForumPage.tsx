

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { ForumCategory, ForumTopic, User } from '../types';
import { FaPlus, FaSearch } from 'react-icons/fa';
import TopicListItem from '../components/forum/TopicListItem';

interface ForumPageProps {
    categories: ForumCategory[];
    topics: ForumTopic[];
    users: User[];
    onSelectTopic: (topicId: string) => void;
    onNavigate: (pageId: string) => void;
    currentUser: User | null;
    onOpenAuthModal: () => void;
}

const ForumPage: React.FC<ForumPageProps> = ({ categories, topics, users, onSelectTopic, onNavigate, currentUser, onOpenAuthModal }) => {
    const [activeCategory, setActiveCategory] = useState<string>('0'); // 0 for 'All'
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('lastReplyAt');
    const [onlineUsers, setOnlineUsers] = useState(25);

    useEffect(() => {
        const interval = setInterval(() => {
            // Fluctuate the number +/- 5 from the base of 25
            setOnlineUsers(25 + Math.floor(Math.random() * 11) - 5);
        }, 3000); // Update every 3 seconds

        return () => clearInterval(interval);
    }, []);

    const findUserById = useCallback((id: string) => {
        return users.find(u => u.id === id);
    }, [users]);

    const totalUsers = users.length;
    const totalTopics = topics.length;
    const totalReplies = useMemo(() => topics.reduce((acc, t) => acc + t.repliesCount, 0), [topics]);
    
    const handleCreateTopic = () => {
        if(currentUser) {
            onNavigate('create-topic');
        } else {
            onOpenAuthModal();
        }
    }

    const filteredAndSortedTopics = useMemo(() => {
        const filtered = topics.filter(topic => {
            const matchesCategory = activeCategory === '0' || topic.categoryId === activeCategory;
            const matchesSearch = searchTerm === '' || topic.title.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        return filtered.sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;

            if (sortBy === 'lastReplyAt') {
                return new Date(b.lastReplyAt || b.createdAt).getTime() - new Date(a.lastReplyAt || a.createdAt).getTime();
            }
            if (sortBy === 'createdAt') {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
            return 0;
        });
    }, [topics, activeCategory, searchTerm, sortBy]);
    
    const CategoryButton: React.FC<{category: {id: string, name: string}, isActive: boolean}> = ({ category, isActive }) => (
         <button
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 whitespace-nowrap ${
                isActive
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600'
            }`}
        >
            {category.name}
        </button>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <header className="bg-slate-800 text-white p-6 md:p-8 rounded-xl">
                 <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Diễn đàn Cộng đồng</h1>
                 <p className="mt-2 text-lg text-slate-300">Nơi trao đổi, học hỏi và chia sẻ kiến thức về tin học văn phòng.</p>
                 <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold">{totalTopics}</p>
                        <p className="text-sm text-slate-400">Chủ đề</p>
                    </div>
                     <div>
                        <p className="text-2xl font-bold">{totalReplies}</p>
                        <p className="text-sm text-slate-400">Bình luận</p>
                    </div>
                     <div>
                        <p className="text-2xl font-bold">{totalUsers}</p>
                        <p className="text-sm text-slate-400">Thành viên</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-green-400">{onlineUsers}</p>
                        <p className="text-sm text-slate-400">Online</p>
                    </div>
                 </div>
            </header>

            {/* Controls */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
                 <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:flex-1">
                         <FaSearch className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm chủ đề..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-400 w-full h-11 rounded-md pl-10 pr-4 text-sm border border-slate-300 dark:border-slate-600"
                        />
                    </div>
                    <button onClick={handleCreateTopic} className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors flex-shrink-0">
                        <FaPlus />
                        <span>Tạo chủ đề mới</span>
                    </button>
                 </div>
                 <div className="flex items-center gap-2 flex-wrap border-t border-slate-200 dark:border-slate-700 pt-4">
                    <CategoryButton category={{id: '0', name: 'Tất cả'}} isActive={activeCategory === '0'} />
                    {categories.map(cat => (
                         <CategoryButton key={cat.id} category={cat} isActive={activeCategory === cat.id} />
                    ))}
                 </div>
            </div>
            
            {/* Topic List */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 font-bold text-sm text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                    <div className="col-span-6">Chủ đề</div>
                    <div className="col-span-2 text-center">Thống kê</div>
                    <div className="col-span-4">Hoạt động cuối</div>
                </div>
                 {filteredAndSortedTopics.length > 0 ? (
                    <div>
                        {filteredAndSortedTopics.map(topic => (
                           <TopicListItem key={topic.id} topic={topic} onSelectTopic={onSelectTopic} findUserById={findUserById} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-slate-500">Không tìm thấy chủ đề nào.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForumPage;