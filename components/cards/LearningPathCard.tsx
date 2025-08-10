

import React from 'react';
import type { LearningPath } from '../../types';
import { FaArrowRight } from 'react-icons/fa';

interface LearningPathCardProps {
  path: LearningPath;
  onSelectPath: (id: string) => void;
}

const LearningPathCard: React.FC<LearningPathCardProps> = ({ path, onSelectPath }) => {
  return (
    <div 
        onClick={() => onSelectPath(path.id)}
        className="cursor-pointer bg-white rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 border border-slate-200 hover:shadow-lg hover:border-indigo-300 transition-all duration-300"
    >
      <div className="flex-1">
        <h3 className="text-xl font-bold text-slate-800 mb-2">{path.title}</h3>
        <p className="text-slate-600 mb-4 text-sm">{path.description}</p>
        <div className="text-indigo-600 font-semibold inline-flex items-center group">
          Xem chi tiết
          <FaArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
      <div className="flex-shrink-0">
        <img className="w-32 h-32 md:w-36 md:h-36 rounded-lg object-contain" src={path.imageUrl} alt={path.title} />
      </div>
    </div>
  );
};

export default LearningPathCard;