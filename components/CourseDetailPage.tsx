

import React from 'react';
import { Course, LearningPath } from '../types';
import { FaCheck, FaBullseye, FaUserGraduate, FaCertificate, FaInfinity, FaPlay, FaRegClock, FaSignal, FaFilm, FaChevronRight } from 'react-icons/fa';
import CurriculumAccordion from './CurriculumAccordion';

interface CourseDetailPageProps {
    course: Course;
    onNavigate: (pageId: string) => void;
    pathContext?: LearningPath | null;
    onSelectPath?: (pathId: string) => void;
}

const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ course, onNavigate, pathContext, onSelectPath }) => {
    
    const totalModules = course.modules?.length || 0;

    const InstructorCard = ({ instructor }: { instructor: Course['instructor']}) => {
        if (!instructor) return null;
        return (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Giảng viên</h2>
                <div className="flex items-start gap-5">
                    <img src={instructor.avatarUrl} alt={instructor.name} className="w-20 h-20 rounded-full object-cover flex-shrink-0"/>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">{instructor.name}</h3>
                        <p className="text-sm text-indigo-600 font-semibold">{instructor.title}</p>
                        <p className="text-sm text-slate-600 mt-2">{instructor.bio}</p>
                    </div>
                </div>
            </div>
        );
    };

    const breadcrumbs: { label: string, action: (() => void) | null }[] = [
        { label: 'Trang chủ', action: () => onNavigate('home') }
    ];

    if (pathContext) {
        breadcrumbs.push({ label: 'Lộ trình', action: () => onNavigate('learning-paths') });
        if (onSelectPath) {
            breadcrumbs.push({ label: pathContext.title, action: () => onSelectPath(pathContext.id) });
        }
    }
    breadcrumbs.push({ label: course.title, action: null });

    return (
        <div className="max-w-full">
            <div className="p-1 mb-6">
                <nav aria-label="breadcrumb">
                    <ol className="flex items-center flex-wrap text-sm text-slate-500">
                        {breadcrumbs.map((crumb, index) => (
                            <li key={index} className="flex items-center">
                                {index > 0 && <FaChevronRight className="inline mx-2 w-2.5 h-2.5" />}
                                {crumb.action ? (
                                    <a href="#" onClick={(e) => { e.preventDefault(); crumb.action?.(); }} className="hover:text-indigo-600">
                                        {crumb.label}
                                    </a>
                                ) : (
                                    <span className="font-semibold text-slate-700">{crumb.label}</span>
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>
            
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
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                                {course.outcomes.map((outcome, index) => (
                                    <li key={index} className="flex items-start">
                                        <FaCheck className="w-4 h-4 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                        <span className="text-slate-600">{outcome}</span>
                                    </li>
                                ))}
                            </ul>
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
                        <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
                             <h2 className="text-2xl font-bold text-slate-800 mb-3 flex items-center"><FaBullseye className="mr-3 text-indigo-500"/>Yêu cầu</h2>
                            <ul className="list-disc list-inside space-y-2 text-slate-600">
                                {course.requirements.map((req, index) => <li key={index}>{req}</li>)}
                            </ul>
                        </div>
                    )}

                    {course.longDescription && (
                         <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-3">Mô tả</h2>
                            <p className="text-slate-600 whitespace-pre-line">{course.longDescription}</p>
                        </div>
                    )}

                    <InstructorCard instructor={course.instructor} />
                </main>

                {/* Sticky Sidebar */}
                <aside className="lg:col-span-1">
                    <div className="sticky top-20 space-y-6">
                        <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
                             <div className="relative">
                                <img src={course.imageUrl} alt={course.title} className="w-full h-auto aspect-video object-cover"/>
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                    <button className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/50 transition-colors">
                                        <FaPlay className="w-6 h-6 ml-1" />
                                    </button>
                                </div>
                                <p className="absolute bottom-3 left-4 text-white font-bold text-sm">Xem giới thiệu</p>
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
                                
                                <button className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-700 transition-colors text-base">
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
