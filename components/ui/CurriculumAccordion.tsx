

import React, { useState } from 'react';
import { Module } from '../../types';
import { FaChevronDown, FaPlayCircle, FaLock } from 'react-icons/fa';

const CurriculumAccordion: React.FC<{ modules: Module[] }> = ({ modules }) => {
    const [openModuleId, setOpenModuleId] = useState<string | null>(modules.length > 0 ? modules[0].id : null);

    const toggleModule = (moduleId: string) => {
        setOpenModuleId(openModuleId === moduleId ? null : moduleId);
    };

    return (
        <div className="space-y-2">
            {modules.map((module, index) => (
                <div key={module.id} className="border border-slate-200 rounded-lg overflow-hidden">
                    <button
                        onClick={() => toggleModule(module.id)}
                        className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                        aria-expanded={openModuleId === module.id}
                        aria-controls={`module-content-${module.id}`}
                    >
                        <div className="text-left">
                            <h3 className="font-bold text-slate-800">{`Phần ${index + 1}: ${module.title}`}</h3>
                            <p className="text-xs text-slate-500 mt-1">{`${module.lessonCount} bài học • ${module.totalDuration}`}</p>
                        </div>
                        <FaChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${openModuleId === module.id ? 'rotate-180' : ''}`} />
                    </button>
                    <div 
                        id={`module-content-${module.id}`}
                        className={`transition-all duration-300 ease-in-out grid ${openModuleId === module.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                    >
                        <div className="overflow-hidden">
                             <ul className="divide-y divide-slate-100">
                                {module.lessons.map(lesson => (
                                    <li key={lesson.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center">
                                            <FaPlayCircle className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
                                            <span className="text-sm text-slate-700">{lesson.title}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-slate-500 flex-shrink-0">
                                            {lesson.isFree ? 
                                                <span className="text-indigo-600 font-semibold text-xs mr-4">XEM TRƯỚC</span> 
                                                : 
                                                <FaLock className="w-3.5 h-3.5 text-slate-400 mr-4" title="Bài học có phí"/>
                                            }
                                            <span>{lesson.duration}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CurriculumAccordion;
