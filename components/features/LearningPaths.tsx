

import React from 'react';
import LearningPathCard from '../cards/LearningPathCard';
import SectionHeader from '../ui/SectionHeader';
import { LearningPath } from '../../types';

interface LearningPathsProps {
  onNavigate: () => void;
  onSelectPath: (id: string) => void;
  learningPaths: LearningPath[];
}

const LearningPaths: React.FC<LearningPathsProps> = ({ onNavigate, onSelectPath, learningPaths }) => {
  return (
    <section className="py-12">
      <SectionHeader title="Lộ trình Học tập" viewAllLink="#" onViewAllClick={onNavigate} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {learningPaths.slice(0, 2).map((path) => (
          <LearningPathCard key={path.id} path={path} onSelectPath={onSelectPath} />
        ))}
      </div>
    </section>
  );
};

export default LearningPaths;