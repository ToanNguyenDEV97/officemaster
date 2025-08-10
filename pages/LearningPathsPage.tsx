

import React from 'react';
import type { LearningPath } from '../types';
import LearningPathDetailCard from '../components/cards/LearningPathDetailCard';
import { FaFilter } from 'react-icons/fa';
import PageHeader from '../components/ui/PageHeader';

interface LearningPathsPageProps {
  onSelectPath: (id: string) => void;
  learningPaths: LearningPath[];
}

const LearningPathsPage: React.FC<LearningPathsPageProps> = ({ onSelectPath, learningPaths }) => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
            <PageHeader
                title="Lộ Trình Học Tập"
                description="Chọn một lộ trình được thiết kế sẵn để trang bị bộ kỹ năng chuyên biệt, giúp bạn đi nhanh và xa hơn trong sự nghiệp."
            />

            <div className="flex justify-between items-center mb-6 border-t border-b border-slate-200 py-3">
                <div className="font-semibold text-slate-700 text-sm">
                    Hiển thị {learningPaths.length} lộ trình
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <FaFilter className="text-slate-500"/>
                    <span>Lọc</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {learningPaths.map((path) => (
                    <LearningPathDetailCard key={path.id} path={path} onSelectPath={onSelectPath} />
                ))}
            </div>
        </div>
    );
};

export default LearningPathsPage;