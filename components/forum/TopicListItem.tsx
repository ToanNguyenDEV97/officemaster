

import React from 'react';
import type { ForumTopic, User } from '../../types';
import { FaThumbtack, FaLock, FaComments, FaEye } from 'react-icons/fa';
import TimeAgo from 'react-timeago';
import viStrings from 'react-timeago/lib/language-strings/vi';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

const formatter = buildFormatter(viStrings);

interface TopicListItemProps {
    topic: ForumTopic;
    onSelectTopic: (topicId: string) => void;
    findUserById: (id: string) => User | undefined;
}

const TopicListItem: React.FC<TopicListItemProps> = ({ topic, onSelectTopic, findUserById }) => {
    const author = findUserById(topic.authorId);
    const lastReplyAuthor = topic.lastReplyAuthorId ? findUserById(topic.lastReplyAuthorId) : null;

    return (
        <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); onSelectTopic(topic.id); }}
            className="grid grid-cols-12 gap-4 p-4 items-center border-b last:border-b-0 border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
        >
            {/* Main Info */}
            <div className="col-span-12 md:col-span-6 flex items-start gap-4">
                <img src={author?.avatarUrl} alt={author?.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                <div className="flex-grow">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 line-clamp-2">
                        {topic.isPinned && <FaThumbtack className="inline-block w-3.5 h-3.5 mr-2 text-yellow-500" title="Ghim" />}
                        {topic.isLocked && <FaLock className="inline-block w-3 h-3 mr-2 text-red-500" title="Khóa" />}
                        {topic.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Bởi <span className="font-semibold">{author?.name || 'Vô danh'}</span>, <TimeAgo date={topic.createdAt} formatter={formatter} />
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div className="hidden md:flex col-span-2 flex-col text-center text-sm">
                <div className="font-semibold text-slate-700 dark:text-slate-200">{topic.repliesCount}</div>
                <div className="text-slate-500 dark:text-slate-400 text-xs">Trả lời</div>
                <div className="font-semibold text-slate-700 dark:text-slate-200 mt-1">{topic.viewsCount}</div>
                <div className="text-slate-500 dark:text-slate-400 text-xs">Lượt xem</div>
            </div>
            
            {/* Last Activity */}
            <div className="col-span-12 md:col-span-4 flex items-center gap-3">
                {lastReplyAuthor ? (
                    <>
                        <img src={lastReplyAuthor.avatarUrl} alt={lastReplyAuthor.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                        <div>
                            <p className="text-sm text-slate-700 dark:text-slate-200 font-semibold">{lastReplyAuthor.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400"><TimeAgo date={topic.lastReplyAt || topic.createdAt} formatter={formatter} /></p>
                        </div>
                    </>
                ) : (
                    <p className="text-sm text-slate-500 dark:text-slate-400">Chưa có trả lời</p>
                )}
            </div>
        </a>
    );
};

export default TopicListItem;