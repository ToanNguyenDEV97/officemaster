
import React, { useState, useEffect, useMemo } from 'react';
import type { Module, Lesson } from '../../types';
import { FaChevronDown, FaRegCircle, FaCheckCircle, FaLock } from 'react-icons/fa';

interface CoursePlaylistProps {
    modules: Module[];
    activeLessonId: string | null;
    onSelectLesson: (lesson: Lesson) => void;
    onToggleComplete: (lessonId: string) => void;
}

const CoursePlaylist: React.FC<CoursePlaylistProps> = ({ modules, activeLessonId, onSelectLesson, onToggleComplete }) => {
    
    const findDefaultOpenModule = () => {
        if (activeLessonId) {
            return modules.find(m => m.lessons.some(l => l.id === activeLessonId))?.id || null;
        }
        return modules.length > 0 ? modules[0].id : null;
    };
    
    const [openModuleId, setOpenModuleId] = useState<string | null>(findDefaultOpenModule());
    
    useEffect(() => {
        setOpenModuleId(findDefaultOpenModule());
    }, [activeLessonId, modules]);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-grow overflow-y-auto">
                {modules.map((module, index) => {
                    const completedLessonsInModule = module.lessons.filter(l => l.isCompleted).length;
                    const totalLessonsInModule = module.lessons.length;

                    return (
                        <div key={module.id} className="border-b border-slate-200 dark:border-slate-800 last:border-b-0">
                            <button
                                onClick={() => setOpenModuleId(openModuleId === module.id ? null : module.id)}
                                className="w-full flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <div className="text-left">
                                    <h3 className="font-semibold text-slate-800 dark:text-slate-100">{`Phần ${index + 1}: ${module.title}`}</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                        {completedLessonsInModule}/{totalLessonsInModule} bài học • {module.totalDuration}
                                    </p>
                                </div>
                                <FaChevronDown className={`w-4 h-4 text-slate-500 dark:text-slate-400 transition-transform duration-300 ${openModuleId === module.id ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`grid transition-all duration-300 ease-in-out ${openModuleId === module.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                                <div className="overflow-hidden">
                                    <ul className="bg-slate-50/30 dark:bg-slate-950/30">
                                        {module.lessons.map(lesson => {
                                            const isActive = lesson.id === activeLessonId;
                                            return (
                                                <li key={lesson.id} className="border-t border-slate-200/70 dark:border-slate-800/70">
                                                    <div
                                                        className={`w-full text-left flex items-start gap-3 p-3 text-sm transition-colors relative cursor-pointer ${
                                                            isActive 
                                                            ? 'bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-semibold' 
                                                            : `hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 ${lesson.isCompleted ? 'text-slate-500 dark:text-slate-500' : ''}`
                                                        }`}
                                                        onClick={() => onSelectLesson(lesson)}
                                                    >
                                                        {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-r-full"></div>}
                                                        <button 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                onToggleComplete(lesson.id);
                                                            }}
                                                            className="mt-0.5"
                                                            aria-label={lesson.isCompleted ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu đã hoàn thành'}
                                                        >
                                                            {lesson.isCompleted ? (
                                                                <FaCheckCircle className="w-4 h-4 flex-shrink-0 text-green-500" />
                                                            ) : (
                                                                <FaRegCircle className="w-4 h-4 flex-shrink-0 text-slate-400 dark:text-slate-500" />
                                                            )}
                                                        </button>
                                                        <span className="flex-grow">{lesson.title}</span>
                                                        <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">{lesson.isFree ? 'FREE' : lesson.duration}</span>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CoursePlaylist;