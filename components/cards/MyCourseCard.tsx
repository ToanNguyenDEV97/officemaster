

import React from 'react';
import type { Course } from '../../types';
import { FaPlayCircle } from 'react-icons/fa';

interface MyCourseCardProps {
  course: Course;
  progress: number;
  onSelectCourse: (id: string) => void;
}

const MyCourseCard: React.FC<MyCourseCardProps> = ({ course, progress, onSelectCourse }) => {
    
    const isCompleted = progress === 100;

    return (
        <div className="flex flex-col bg-white rounded-2xl overflow-hidden group transition-all duration-300 hover:shadow-lg border border-slate-200 h-full">
            <div className="relative">
                <img className="w-full aspect-video object-cover" src={course.imageUrl} alt={course.title} />
                <div 
                    onClick={() => onSelectCourse(course.id)}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                    <FaPlayCircle className="w-12 h-12 text-white/80" />
                </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-slate-800 text-base mb-1 h-12 line-clamp-2">
                    {course.title}
                </h3>
                 <p className="text-xs text-slate-500 mb-3">bởi {course.instructorName}</p>

                <div className="mt-auto">
                    <div className="w-full bg-slate-200 rounded-full h-1.5 mb-1.5">
                        <div 
                            className={`h-1.5 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-indigo-600'}`} 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                     <p className="text-xs text-slate-500 text-right mb-3">{isCompleted ? 'Đã hoàn thành' : `${progress}% hoàn thành`}</p>
                    <button
                        onClick={() => onSelectCourse(course.id)}
                        className="w-full text-center py-2 px-4 border border-indigo-600 text-indigo-600 rounded-lg font-semibold text-sm hover:bg-indigo-50 transition-colors"
                    >
                        {isCompleted ? 'Xem lại khóa học' : 'Tiếp tục học'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyCourseCard;