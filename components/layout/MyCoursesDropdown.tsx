

import React from 'react';
import type { Course, EnrolledCourse } from '../../types';

interface MyCoursesDropdownProps {
  courses: (EnrolledCourse & { details?: Course })[];
  onNavigate: (pageId: string) => void;
  onSelectCourse: (courseId: string) => void;
}

const MyCoursesDropdown: React.FC<MyCoursesDropdownProps> = ({ courses, onNavigate, onSelectCourse }) => {
    const hasCourses = courses.length > 0;

    return (
        <div 
            className="absolute right-0 top-full mt-2 w-96 bg-white dark:bg-slate-800 rounded-lg shadow-xl ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-10 z-50 overflow-hidden transform transition-all duration-150 ease-out origin-top-right animate-fade-in-scale"
        >
            <header className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-slate-700">
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">Khóa học của tôi</h3>
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('my-courses'); }} className="text-sm font-semibold text-orange-600 dark:text-orange-500 hover:underline">
                    Xem tất cả
                </a>
            </header>

            {hasCourses ? (
                <ul className="max-h-[calc(100vh-200px)] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700">
                    {courses.map(({ details, progress, lastLearned }) => {
                        if (!details) return null;
                        const isNotStarted = progress === 0;
                        return (
                            <li key={details.id}>
                                <div
                                    onClick={() => onSelectCourse(details.id)}
                                    className="flex items-start gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                                >
                                    <img 
                                        src={details.imageUrl} 
                                        alt={details.title} 
                                        className="w-28 h-16 object-cover rounded flex-shrink-0" 
                                    />
                                    <div className="flex-grow overflow-hidden w-full flex flex-col self-stretch">
                                        <div>
                                            <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-100 line-clamp-2 leading-tight h-10">
                                                {details.title}
                                            </h4>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
                                                {lastLearned}
                                            </p>
                                        </div>
                                        <div className="mt-auto pt-1">
                                            {isNotStarted ? (
                                                <span className="font-bold text-orange-600 dark:text-orange-500 text-sm">Bắt đầu học</span>
                                            ) : (
                                                <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-1.5">
                                                    <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <div className="p-8 text-center">
                    <p className="text-slate-500 dark:text-slate-400">Bạn chưa đăng ký khóa học nào.</p>
                </div>
            )}
            <style>{`
                @keyframes fade-in-scale {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in-scale {
                    animation: fade-in-scale 0.15s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default MyCoursesDropdown;