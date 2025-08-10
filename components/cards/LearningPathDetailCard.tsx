

import React from 'react';
import type { LearningPath } from '../../types';
import { FaBookOpen, FaRegClock, FaArrowRight } from 'react-icons/fa';

interface LearningPathDetailCardProps {
  path: LearningPath;
  onSelectPath: (id: string) => void;
}

const LearningPathDetailCard: React.FC<LearningPathDetailCardProps> = ({ path, onSelectPath }) => {
  return (
    <div 
        onClick={() => onSelectPath(path.id)}
        className="cursor-pointer flex flex-col bg-white rounded-2xl overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-slate-200 hover:border-indigo-300 h-full"
    >
        {/* Image Section */}
        <div className="flex-shrink-0">
            <img className="w-full h-48 object-cover" src={path.imageUrl} alt={path.title} />
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col flex-1">
            {/* Main Content */}
            <div className="flex-1">
                <h3 className="font-bold text-lg text-slate-800 group-hover:text-indigo-600 transition-colors mb-2 line-clamp-2">
                    {path.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {path.description}
                </p>
                <div className="flex flex-wrap gap-2">
                    {path.tags.map(tag => (
                        <span key={tag} className="bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>
                    ))}
                </div>
            </div>
            
            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
                 <div className="flex items-center text-sm text-slate-500 space-x-4">
                    <span className="flex items-center" title="Số khóa học">
                        <FaBookOpen className="mr-1.5 text-slate-400" /> {path.courseCount} khóa học
                    </span>
                    <span className="flex items-center" title="Thời lượng">
                        <FaRegClock className="mr-1.5 text-slate-400" /> {path.duration}
                    </span>
                </div>
                <div className="text-indigo-600 font-semibold inline-flex items-center group/link text-sm">
                    Xem chi tiết
                    <FaArrowRight className="w-3 h-3 ml-1.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                </div>
            </div>
        </div>
    </div>
  );
};

export default LearningPathDetailCard;