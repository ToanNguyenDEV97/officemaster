

import React from 'react';
import { LearningPath } from '../types';
import { FaBookOpen, FaRegClock, FaUsers, FaCheck, FaBullseye, FaPlay, FaInfinity, FaCertificate, FaChevronRight } from 'react-icons/fa';

interface LearningPathDetailPageProps {
    path: LearningPath;
    onNavigate: (pageId: string) => void;
    onSelectCourse: (courseId: string) => void;
}

const LearningPathDetailPage: React.FC<LearningPathDetailPageProps> = ({ path, onNavigate, onSelectCourse }) => {
    
    const totalLessons = path.courses.reduce((sum, course) => sum + course.lessons, 0);
    const totalModules = path.courses.reduce((sum, course) => sum + (course.modules?.length || 0), 0);

    return (
        <div className="bg-white rounded-xl border border-slate-200">
            {/* Header */}
            <header className="bg-slate-800 text-white p-6 md:p-10 rounded-t-xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{path.title}</h1>
                        <p className="mt-3 text-lg text-slate-300">{path.longDescription}</p>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm text-slate-300">
                            <span className="flex items-center"><FaBookOpen className="mr-2 text-indigo-400" /> {path.courseCount} khóa học</span>
                            <span className="flex items-center"><FaRegClock className="mr-2 text-indigo-400" /> Tổng {path.duration}</span>
                            <span className="flex items-center"><FaUsers className="mr-2 text-indigo-400" /> {path.students.toLocaleString('vi-VN')} học viên</span>
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src={path.imageUrl} alt={path.title} className="w-full h-48 object-cover"/>
                            <div className="p-5">
                                <h3 className="font-bold text-slate-800 text-lg mb-3">Lộ trình này bao gồm</h3>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex items-center text-slate-600">
                                        <FaBookOpen className="w-4 h-4 mr-3 text-indigo-500 flex-shrink-0" />
                                        <span><span className="font-semibold">{path.courseCount}</span> khóa học chuyên sâu</span>
                                    </li>
                                    <li className="flex items-center text-slate-600">
                                        <FaPlay className="w-4 h-4 mr-3 text-indigo-500 flex-shrink-0" />
                                        <span><span className="font-semibold">{totalLessons}</span> bài học chi tiết</span>
                                    </li>
                                    <li className="flex items-center text-slate-600">
                                        <FaInfinity className="w-4 h-4 mr-3 text-indigo-500 flex-shrink-0" />
                                        <span>Truy cập trọn đời</span>
                                    </li>
                                    <li className="flex items-center text-slate-600">
                                        <FaCertificate className="w-4 h-4 mr-3 text-indigo-500 flex-shrink-0" />
                                        <span>Chứng chỉ hoàn thành</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            
            <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <main className="lg:col-span-2 space-y-10">
                    {/* What you'll learn */}
                    <section className="border border-slate-200 rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">Bạn sẽ học được gì?</h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                            {path.outcomes.map((outcome, index) => (
                                <li key={index} className="flex items-start">
                                    <FaCheck className="w-4 h-4 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                    <span className="text-slate-600">{outcome}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Curriculum */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Các khóa học trong lộ trình</h2>
                         <p className="text-sm text-slate-500 mb-5">{path.courseCount} khóa học • {totalModules} phần • {totalLessons} bài học • Tổng thời lượng {path.duration}</p>
                        <div className="space-y-4">
                            {path.courses.map((course, index) => (
                                <div
                                    key={course.id}
                                    onClick={() => onSelectCourse(course.id)}
                                    className="group cursor-pointer bg-white rounded-lg border border-slate-200 p-4 transition-all duration-300 hover:shadow-lg hover:border-indigo-400 hover:-translate-y-1"
                                >
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                                        {/* Number */}
                                        <div className="hidden sm:block flex-shrink-0 font-bold text-2xl text-slate-400 w-10 text-center">{index + 1}</div>

                                        {/* Image */}
                                        <img src={course.imageUrl} alt={course.title} className="w-full sm:w-40 h-auto object-cover rounded-md flex-shrink-0 self-center" />

                                        {/* Course Info */}
                                        <div className="flex-grow">
                                            <h3 className="text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{course.title}</h3>
                                            <p className="text-sm text-slate-600 mt-1 mb-3 line-clamp-2">{course.longDescription || course.tagline}</p>
                                            <div className="flex flex-wrap items-center text-xs text-slate-500 gap-x-4 gap-y-1">
                                                <span className="flex items-center">
                                                    <img src={course.instructorAvatarUrl} alt={course.instructorName} className="w-5 h-5 rounded-full mr-1.5 object-cover" />
                                                    {course.instructorName}
                                                </span>
                                                <span className="flex items-center"><FaPlay className="w-3 h-3 mr-1.5 text-slate-400" /> {course.lessons} bài học</span>
                                                <span className="flex items-center"><FaRegClock className="w-3 h-3 mr-1.5 text-slate-400" /> {course.duration}</span>
                                            </div>
                                        </div>

                                        {/* Arrow */}
                                        <div className="hidden sm:flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors">
                                            <FaChevronRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                <aside className="lg:col-span-1 space-y-8">
                    {/* Requirements */}
                    <div className="border border-slate-200 rounded-lg p-6">
                        <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center"><FaBullseye className="mr-3 text-indigo-500"/>Yêu cầu</h3>
                        <ul className="list-disc list-inside space-y-2 text-slate-600">
                            {path.requirements.map((req, index) => <li key={index}>{req}</li>)}
                        </ul>
                    </div>

                    {/* Target Audience */}
                     <div className="border border-slate-200 rounded-lg p-6">
                        <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center"><FaUsers className="mr-3 text-indigo-500"/>Lộ trình này dành cho ai?</h3>
                        <p className="text-slate-600">{path.targetAudience}</p>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default LearningPathDetailPage;
