

import React, { useState } from 'react';
import { Course, LearningPath, User } from '../types';
import { FaBullseye, FaCertificate, FaInfinity, FaPlay, FaRegClock, FaSignal, FaFilm, FaTimes } from 'react-icons/fa';
import CurriculumAccordion from '../components/ui/CurriculumAccordion';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Checklist from '../components/ui/Checklist';
import InfoCard from '../components/cards/InfoCard';
import AuthorCard from '../components/cards/AuthorCard';
import ReviewsSection from '../components/reviews/ReviewsSection';

interface CourseDetailPageProps {
    course: Course;
    onNavigate: (pageId: string) => void;
    pathContext?: LearningPath | null;
    onSelectPath?: (pathId: string) => void;
    currentUser: User | null;
    onOpenAuthModal: () => void;
}

const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ course, onNavigate, pathContext, onSelectPath, currentUser, onOpenAuthModal }) => {
    
    const [isIntroVideoOpen, setIntroVideoOpen] = useState(false);
    const totalModules = course.modules?.length || 0;

    const breadcrumbItems: { label: string, action: ((e: React.MouseEvent<HTMLAnchorElement>) => void) | null }[] = [
        { label: 'Trang chủ', action: (e) => { e.preventDefault(); onNavigate('home'); } }
    ];

    if (pathContext) {
        breadcrumbItems.push({ label: 'Lộ trình', action: (e) => { e.preventDefault(); onNavigate('learning-paths'); } });
        if (onSelectPath) {
            breadcrumbItems.push({ label: pathContext.title, action: (e) => { e.preventDefault(); onSelectPath(pathContext.id); } });
        }
    }
    breadcrumbItems.push({ label: course.title, action: null });

    const handleEnrollClick = () => {
      if (currentUser) {
        alert(`Chúc mừng ${currentUser.name}! Bạn đã đăng ký thành công khóa học "${course.title}".`);
      } else {
        onOpenAuthModal();
      }
    };

    // Video Modal Component
    const VideoModal = () => {
        const isYoutubeVideo = course.introVideoUrl?.includes('youtube.com/embed');
        let videoSrc = course.introVideoUrl || '';
        
        if (isYoutubeVideo) {
            try {
                const url = new URL(videoSrc);
                url.searchParams.set('autoplay', '1');
                url.searchParams.set('mute', '1'); // Mute is required for reliable autoplay in most browsers
                videoSrc = url.toString();
            } catch (error) {
                console.error("Invalid video URL:", videoSrc, error);
                videoSrc = ''; // Prevent rendering with invalid URL
            }
        }

        return (
            <div 
                className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 animate-fade-in"
                onClick={() => setIntroVideoOpen(false)}
            >
                <div 
                    className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-start">
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Giới thiệu khóa học</p>
                            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-1">{course.title}</h2>
                        </div>
                        <button 
                            onClick={() => setIntroVideoOpen(false)}
                            className="p-2 -mr-2 -mt-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            aria-label="Đóng video"
                        >
                            <FaTimes className="text-slate-600 dark:text-slate-300 w-5 h-5"/>
                        </button>
                    </div>

                    {/* Video Player */}
                    <div className="aspect-video bg-black">
                        {isYoutubeVideo ? (
                            <iframe
                                src={videoSrc}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        ) : (
                            <video
                                src={course.introVideoUrl}
                                controls
                                autoPlay
                                muted
                                className="w-full h-full"
                            >
                                Trình duyệt của bạn không hỗ trợ thẻ video.
                            </video>
                        )}
                    </div>
                </div>
                 <style>{`
                    @keyframes fade-in {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    .animate-fade-in {
                        animation: fade-in 0.2s ease-out forwards;
                    }
                `}</style>
            </div>
        );
    };

    return (
        <div className="max-w-full">
            {isIntroVideoOpen && course.introVideoUrl && <VideoModal />}
            <Breadcrumbs items={breadcrumbItems} className="p-1 mb-6" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main content */}
                <main className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-800">{course.title}</h1>
                        <p className="mt-3 text-lg text-slate-600">{course.tagline}</p>
                        
                        <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center text-sm">
                                <img src={course.instructorAvatarUrl} alt={course.instructorName} className="w-8 h-8 rounded-full mr-2.5 object-cover"/>
                                <div>
                                    <p className="text-slate-500 text-xs">Giảng viên</p>
                                    <p className="font-semibold text-slate-800">{course.instructorName}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {course.outcomes && course.outcomes.length > 0 && (
                        <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">Bạn sẽ học được gì?</h2>
                            <Checklist items={course.outcomes} />
                        </div>
                    )}
                    
                    {course.modules && course.modules.length > 0 && (
                        <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">Nội dung khóa học</h2>
                            <p className="text-sm text-slate-500 mb-5">{totalModules} phần • {course.lessons} bài học • Thời lượng {course.duration}</p>
                            <CurriculumAccordion modules={course.modules} />
                        </div>
                    )}

                    {course.requirements && course.requirements.length > 0 && (
                        <InfoCard title="Yêu cầu" icon={<FaBullseye className="text-indigo-500" />}>
                            <ul className="list-disc list-inside space-y-2 text-slate-600">
                                {course.requirements.map((req, index) => <li key={index}>{req}</li>)}
                            </ul>
                        </InfoCard>
                    )}

                    {course.longDescription && (
                         <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-3">Mô tả</h2>
                            <p className="text-slate-600 whitespace-pre-line">{course.longDescription}</p>
                        </div>
                    )}

                    <AuthorCard author={course.instructor} heading="Giảng viên" />

                    <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
                        <ReviewsSection
                            courseId={course.id}
                            currentUser={currentUser}
                            onOpenAuthModal={onOpenAuthModal}
                        />
                    </div>

                </main>

                {/* Sticky Sidebar */}
                <aside className="lg:col-span-1">
                    <div className="sticky top-20 space-y-6">
                        <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
                             <div className="relative">
                                <img src={course.imageUrl} alt={course.title} className="w-full h-auto aspect-video object-cover"/>
                                <div 
                                    className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer group"
                                    onClick={() => course.introVideoUrl && setIntroVideoOpen(true)}
                                >
                                    <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-white/50 group-hover:scale-110 transition-all duration-300">
                                        <FaPlay className="w-6 h-6 ml-1" />
                                    </div>
                                </div>
                                <p className="absolute bottom-3 left-4 text-white font-bold text-sm drop-shadow-md pointer-events-none">Xem giới thiệu</p>
                            </div>
                            <div className="p-4 space-y-3">
                                <div className="text-center">
                                    {course.isPro ? (
                                        <div className="flex items-baseline justify-center gap-2">
                                            <span className="text-2xl font-bold text-slate-800">{course.price?.toLocaleString('vi-VN')}đ</span>
                                            <span className="text-slate-500 line-through">{course.oldPrice?.toLocaleString('vi-VN')}đ</span>
                                        </div>
                                    ) : (
                                        <p className="text-2xl font-bold text-green-600">Miễn phí</p>
                                    )}
                                </div>
                                
                                <button 
                                    onClick={handleEnrollClick}
                                    className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-700 transition-colors text-base"
                                >
                                    Đăng ký học
                                </button>
                                
                                <ul className="space-y-2.5 text-sm pt-2">
                                    <li className="flex items-start text-slate-600">
                                        <FaSignal className="w-4 h-4 mr-3 text-indigo-500 mt-0.5 flex-shrink-0" />
                                        <span>Trình độ: <span className="font-semibold ml-1">{course.level || 'Mọi trình độ'}</span></span>
                                    </li>
                                    <li className="flex items-start text-slate-600">
                                        <FaFilm className="w-4 h-4 mr-3 text-indigo-500 mt-0.5 flex-shrink-0" />
                                        <span>Tổng số <span className="font-semibold mx-1">{course.lessons}</span> bài học</span>
                                    </li>
                                    <li className="flex items-start text-slate-600">
                                        <FaRegClock className="w-4 h-4 mr-3 text-indigo-500 mt-0.5 flex-shrink-0" />
                                        <span>Thời lượng <span className="font-semibold mx-1">{course.duration}</span></span>
                                    </li>
                                    <li className="flex items-start text-slate-600">
                                        <FaInfinity className="w-4 h-4 mr-3 text-indigo-500 mt-0.5 flex-shrink-0" />
                                        <span>Sở hữu khóa học trọn đời</span>
                                    </li>
                                    <li className="flex items-start text-slate-600">
                                        <FaCertificate className="w-4 h-4 mr-3 text-indigo-500 mt-0.5 flex-shrink-0" />
                                        <span>Cấp chứng chỉ hoàn thành</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default CourseDetailPage;