
import React, { useState, useMemo } from 'react';
import type { Comment, User } from '../../types';
import { comments as allComments } from '../../data/comments';
import { FaReply } from 'react-icons/fa';

interface CommentsSectionProps {
    postId: string;
    currentUser: User | null;
    onOpenAuthModal: () => void;
}

const CommentForm: React.FC<{
    currentUser: User;
    onSubmit: (content: string) => void;
    onCancel?: () => void;
    isReply?: boolean;
}> = ({ currentUser, onSubmit, onCancel, isReply = false }) => {
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (content.trim()) {
            onSubmit(content);
            setContent('');
        }
    };
    
    return (
        <div className={`flex items-start gap-3 ${isReply ? 'mt-3' : 'mb-8'}`}>
            <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-10 h-10 rounded-full object-cover" />
            <form onSubmit={handleSubmit} className="w-full">
                <textarea
                    placeholder="Viết bình luận của bạn..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={isReply ? 2 : 3}
                    className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <div className="flex items-center gap-2 mt-2">
                    <button type="submit" className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg font-semibold text-sm hover:bg-indigo-700">
                        {isReply ? 'Gửi trả lời' : 'Gửi bình luận'}
                    </button>
                    {isReply && onCancel && (
                        <button type="button" onClick={onCancel} className="bg-slate-200 text-slate-700 px-4 py-1.5 rounded-lg font-semibold text-sm hover:bg-slate-300">
                            Hủy
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

const CommentItem: React.FC<{ 
    comment: Comment, 
    onReply: (commentId: string, content: string) => void,
    currentUser: User | null
}> = ({ comment, onReply, currentUser }) => {
    const [isReplying, setIsReplying] = useState(false);
    
    const handleReplySubmit = (content: string) => {
        onReply(comment.id, content);
        setIsReplying(false);
    }
    
    return (
        <div className="flex items-start gap-4">
            <img src={comment.user.avatarUrl} alt={comment.user.name} className="w-10 h-10 rounded-full object-cover" />
            <div className="w-full">
                <div className="bg-slate-100 rounded-lg p-3">
                    <span className="font-semibold text-sm text-slate-800">{comment.user.name}</span>
                    <p className="text-sm text-slate-700 whitespace-pre-line">{comment.content}</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 pl-1">
                    <span>{comment.publishedDate}</span>
                    <button onClick={() => setIsReplying(!isReplying)} className="font-semibold hover:underline flex items-center gap-1"><FaReply /> Trả lời</button>
                </div>

                {isReplying && currentUser && (
                    <CommentForm
                        currentUser={currentUser}
                        onSubmit={handleReplySubmit}
                        onCancel={() => setIsReplying(false)}
                        isReply={true}
                    />
                )}

                {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 space-y-4 border-l-2 border-slate-200 pl-4">
                        {comment.replies.map(reply => (
                            <CommentItem key={reply.id} comment={reply} onReply={onReply} currentUser={currentUser} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ postId, currentUser, onOpenAuthModal }) => {
    // In a real app, comments would be fetched via API
    const postComments = useMemo(() => (allComments as any)[postId] || [], [postId]);
    const [comments, setComments] = useState<Comment[]>(postComments);
    
    const totalComments = useMemo(() => {
        let count = 0;
        const countReplies = (comment: Comment) => {
            count++;
            if (comment.replies) {
                comment.replies.forEach(countReplies);
            }
        };
        comments.forEach(countReplies);
        return count;
    }, [comments]);
    
    const handleAddComment = (content: string) => {
        if (!currentUser) return;
        const newComment: Comment = {
            id: String(Date.now()),
            postId,
            user: { name: currentUser.name, avatarUrl: currentUser.avatarUrl },
            content,
            publishedDate: 'Vừa xong',
            replies: [],
        };
        setComments(prev => [newComment, ...prev]);
    };

    const handleAddReply = (commentId: string, content: string) => {
        if (!currentUser) return;
        const newReply: Comment = {
             id: String(Date.now()),
            postId,
            user: { name: currentUser.name, avatarUrl: currentUser.avatarUrl },
            content,
            publishedDate: 'Vừa xong',
        };

        const addReplyToComment = (commentsList: Comment[]): Comment[] => {
            return commentsList.map(comment => {
                if (comment.id === commentId) {
                    return { ...comment, replies: [...(comment.replies || []), newReply] };
                }
                if (comment.replies) {
                    return { ...comment, replies: addReplyToComment(comment.replies) };
                }
                return comment;
            });
        };
        
        setComments(addReplyToComment(comments));
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">{totalComments} Bình luận</h2>

            {currentUser ? (
                <CommentForm currentUser={currentUser} onSubmit={handleAddComment} />
            ) : (
                <div className="text-center p-5 mb-8 bg-slate-100 rounded-lg">
                    <p className="text-slate-700">Bạn cần đăng nhập để để lại bình luận.</p>
                    <button onClick={onOpenAuthModal} className="mt-2 text-indigo-600 font-semibold hover:underline">Đăng nhập ngay</button>
                </div>
            )}
            
            <div className="space-y-6">
                {comments.map(comment => (
                    <CommentItem key={comment.id} comment={comment} onReply={handleAddReply} currentUser={currentUser} />
                ))}
            </div>
        </div>
    );
};

export default CommentsSection;