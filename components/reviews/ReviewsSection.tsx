
import React, { useState, useMemo } from 'react';
import type { Review, User } from '../../types';
import { reviews as allReviews } from '../../data/reviews';
import StarRating from '../ui/StarRating';
import { FaThumbsUp, FaUserCircle, FaStar } from 'react-icons/fa';

interface ReviewsSectionProps {
    courseId: string;
    currentUser: User | null;
    onOpenAuthModal: () => void;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ courseId, currentUser, onOpenAuthModal }) => {
    // In a real app, reviews would be fetched via API based on courseId
    // Here we simulate it using a similar keying method if the mock data used string keys
    const courseReviews = useMemo(() => (allReviews as any)[courseId] || [], [courseId]);
    const [reviews, setReviews] = useState<Review[]>(courseReviews);

    // Form state
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const averageRating = useMemo(() => {
        if (reviews.length === 0) return 0;
        const total = reviews.reduce((acc, review) => acc + review.rating, 0);
        return total / reviews.length;
    }, [reviews]);

    const ratingDistribution = useMemo(() => {
        const distribution = [0, 0, 0, 0, 0]; // Index 0 for 1 star, up to index 4 for 5 stars
        reviews.forEach(review => {
            if (review.rating >= 1 && review.rating <= 5) {
                distribution[review.rating - 1]++;
            }
        });
        return distribution.map(count => reviews.length > 0 ? (count / reviews.length) * 100 : 0).reverse();
    }, [reviews]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (rating > 0 && title && content && currentUser) {
            const newReview: Review = {
                id: String(Date.now()),
                courseId: courseId,
                user: { name: currentUser.name, avatarUrl: currentUser.avatarUrl },
                rating,
                title,
                content,
                publishedDate: 'Vừa xong',
                helpful: 0,
            };
            setReviews(prev => [newReview, ...prev]);
            // Reset form
            setRating(0);
            setTitle('');
            setContent('');
        }
    };
    
    return (
        <div id="reviews" className="scroll-mt-20">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Đánh giá từ học viên</h2>

            {/* Rating Summary */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-8">
                <div className="flex-shrink-0 text-center bg-slate-50 p-6 rounded-lg">
                    <p className="text-5xl font-bold text-slate-800">{averageRating.toFixed(1)}</p>
                    <StarRating rating={averageRating} showText={false} starSize="w-5 h-5" className="justify-center mt-2" />
                    <p className="text-sm text-slate-600 mt-2">({reviews.length} đánh giá)</p>
                </div>
                <div className="flex-grow">
                    <div className="space-y-1">
                    {ratingDistribution.map((percentage, index) => (
                        <div key={index} className="flex items-center gap-2">
                             <span className="text-sm font-medium text-slate-600">{5 - index} sao</span>
                             <div className="w-full bg-slate-200 rounded-full h-2.5">
                                 <div className="bg-amber-400 h-2.5 rounded-full" style={{width: `${percentage}%`}}></div>
                             </div>
                             <span className="text-sm text-slate-500 w-10 text-right">{percentage.toFixed(0)}%</span>
                        </div>
                    ))}
                    </div>
                </div>
            </div>

            {/* Write a Review */}
            {currentUser ? (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-8">
                     <div className="flex items-start gap-4">
                        <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-11 h-11 rounded-full object-cover"/>
                        <form onSubmit={handleSubmit} className="w-full">
                             <p className="font-semibold text-slate-700">Viết đánh giá của bạn</p>
                             <div className="flex items-center my-2">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <FaStar
                                        key={star}
                                        className={`cursor-pointer w-6 h-6 transition-colors ${(hoverRating || rating) >= star ? 'text-amber-400' : 'text-slate-300'}`}
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                    />
                                ))}
                            </div>
                            <input
                                type="text"
                                placeholder="Tiêu đề đánh giá (ví dụ: Khóa học tuyệt vời!)"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="block w-full px-3 py-2 mb-2 bg-white border border-slate-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                            <textarea
                                placeholder="Nội dung đánh giá của bạn..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                                rows={3}
                                className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                            <button type="submit" className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-indigo-700">Gửi đánh giá</button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="text-center p-5 mb-8 bg-slate-100 rounded-lg">
                    <p className="text-slate-700">Bạn cần đăng nhập để để lại đánh giá.</p>
                    <button onClick={onOpenAuthModal} className="mt-2 text-indigo-600 font-semibold hover:underline">Đăng nhập ngay</button>
                </div>
            )}


            {/* Reviews List */}
            <div className="space-y-6">
                {reviews.map(review => (
                    <div key={review.id} className="flex items-start gap-4 pb-6 border-b border-slate-200 last:border-b-0">
                        <img src={review.user.avatarUrl} alt={review.user.name} className="w-11 h-11 rounded-full object-cover"/>
                        <div className="w-full">
                            <p className="font-semibold text-slate-800">{review.user.name}</p>
                            <div className="flex items-center gap-3 my-1">
                                <StarRating rating={review.rating} showText={false} />
                                <span className="text-sm text-slate-500">{review.publishedDate}</span>
                            </div>
                            <h4 className="font-bold text-slate-800 mt-2">{review.title}</h4>
                            <p className="text-slate-600 mt-1">{review.content}</p>
                            <div className="flex items-center gap-4 mt-3">
                                <button className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors">
                                    <FaThumbsUp/>
                                    <span>Hữu ích ({review.helpful})</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewsSection;