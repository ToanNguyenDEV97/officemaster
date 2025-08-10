

import React, { useState } from 'react';
import type { ForumReply, User } from '../../types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from '../ui/CodeBlock';
import { FaUser, FaCalendarAlt, FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
import TimeAgo from 'react-timeago';
import viStrings from 'react-timeago/lib/language-strings/vi';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

const formatter = buildFormatter(viStrings);

interface ReplyCardProps {
    reply: ForumReply;
    isOriginalPost?: boolean;
    findUserById: (id: string) => User | undefined;
}

const ReplyCard: React.FC<ReplyCardProps> = ({ reply, isOriginalPost = false, findUserById }) => {
    const author = findUserById(reply.authorId);
    const [upvoted, setUpvoted] = useState(false);
    const [upvoteCount, setUpvoteCount] = useState(reply.upvotes);

    const handleUpvote = () => {
        setUpvoted(!upvoted);
        setUpvoteCount(upvoted ? upvoteCount - 1 : upvoteCount + 1);
    }
    
    return (
        <div className={`flex gap-5 ${isOriginalPost ? 'mt-6' : 'pl-0 sm:pl-16'}`}>
            {!isOriginalPost && (
                <div className="hidden sm:flex flex-col items-center flex-shrink-0">
                    <img src={author?.avatarUrl} alt={author?.name} className="w-12 h-12 rounded-full object-cover"/>
                </div>
            )}
            <div className={`w-full rounded-lg ${isOriginalPost ? '' : 'bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700'}`}>
                {isOriginalPost ? (
                    <article className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none prose-h2:scroll-mt-24 prose-h3:scroll-mt-24 prose-headings:font-bold prose-headings:text-slate-800 dark:prose-headings:text-slate-100 prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-700">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{ code: CodeBlock }}
                        >
                            {reply.content}
                        </ReactMarkdown>
                    </article>
                ) : (
                    <>
                        <div className="flex justify-between items-center p-3 border-b border-slate-200 dark:border-slate-600">
                             <div className="flex items-center gap-3">
                                <img src={author?.avatarUrl} alt={author?.name} className="w-8 h-8 rounded-full object-cover sm:hidden"/>
                                <div>
                                    <p className="font-semibold text-slate-800 dark:text-slate-100">{author?.name || 'Vô danh'}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                       <TimeAgo date={reply.createdAt} formatter={formatter} />
                                    </p>
                                </div>
                            </div>
                        </div>
                         <div className="p-4 prose prose-slate dark:prose-invert max-w-none text-sm">
                             <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ code: CodeBlock }}>
                                {reply.content}
                            </ReactMarkdown>
                        </div>
                        <div className="px-4 pb-3 flex items-center justify-end">
                             <button onClick={handleUpvote} className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${upvoted ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:text-indigo-600'}`}>
                                {upvoted ? <FaThumbsUp /> : <FaRegThumbsUp />}
                                <span>{upvoteCount}</span>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ReplyCard;