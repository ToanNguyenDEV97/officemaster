
import React, { useState } from 'react';
import type { ForumCategory, User, ForumTopic } from '../types';
import Breadcrumbs from '../components/ui/Breadcrumbs';

interface CreateTopicPageProps {
    categories: ForumCategory[];
    currentUser: User;
    onTopicCreated: (newTopic: Omit<ForumTopic, 'id' | 'repliesCount' | 'viewsCount' | 'createdAt'>) => void;
    onNavigate: (pageId: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

const CreateTopicPage: React.FC<CreateTopicPageProps> = ({ categories, currentUser, onTopicCreated, onNavigate }) => {
    const [title, setTitle] = useState('');
    const [categoryId, setCategoryId] = useState<string>(categories[0]?.id || '0');
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim() || categoryId === '0') {
            alert('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        onTopicCreated({
            title,
            content,
            categoryId,
            authorId: currentUser.id,
        });
    };

    const breadcrumbItems = [
        { label: 'Trang chủ', action: (e: React.MouseEvent<HTMLAnchorElement>) => onNavigate('home', e) },
        { label: 'Diễn đàn', action: (e: React.MouseEvent<HTMLAnchorElement>) => onNavigate('forum', e) },
        { label: 'Tạo chủ đề mới', action: null }
    ];

    return (
        <div className="space-y-6">
            <Breadcrumbs items={breadcrumbItems} />
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 md:p-8">
                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Tạo chủ đề mới</h1>
                    <p className="mt-1 text-slate-500 dark:text-slate-400">Chia sẻ câu hỏi hoặc kiến thức của bạn với cộng đồng.</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="topic-title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tiêu đề</label>
                        <input
                            type="text"
                            id="topic-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="Ví dụ: Cách dùng hàm SUMIF với nhiều điều kiện?"
                            className="block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="topic-category" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Chuyên mục</label>
                        <select
                            id="topic-category"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            required
                            className="block w-full md:w-1/3 px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="0" disabled>-- Chọn chuyên mục --</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="topic-content" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nội dung</label>
                         <textarea
                            id="topic-content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={10}
                            required
                            placeholder="Mô tả chi tiết vấn đề hoặc nội dung bạn muốn chia sẻ. Bạn có thể dùng Markdown để định dạng."
                            className="block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        ></textarea>
                         <p className="text-xs text-slate-500 mt-1">Hỗ trợ định dạng <a href="https://www.markdownguide.org/basic-syntax/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Markdown</a>.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button type="submit" className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                            Đăng chủ đề
                        </button>
                         <button type="button" onClick={() => onNavigate('forum')} className="bg-slate-100 text-slate-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-slate-200 transition-colors">
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTopicPage;