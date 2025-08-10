

import React from 'react';
import type { Course } from '../../types';
import { siteStats } from '../../data/content';
import CourseCard from '../cards/CourseCard';
import SectionHeader from '../ui/SectionHeader';

interface FeaturedCoursesProps {
  onSelectCourse: (id: string) => void;
  onNavigate: (pageId: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
  proCourses: Course[];
  freeCourses: Course[];
}

const FeaturedCourses: React.FC<FeaturedCoursesProps> = ({ onSelectCourse, onNavigate, proCourses, freeCourses }) => {
  return (
    <>
      <section className="pb-6">
        <SectionHeader title="Khóa học Pro" viewAllLink="#" onViewAllClick={(e) => onNavigate('courses', e)} tag="Mới" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {proCourses.map((course) => (
            <CourseCard key={course.id} item={course} onSelectCourse={onSelectCourse} />
          ))}
        </div>
      </section>

      <div className="text-center my-6">
        <div className="inline-block bg-indigo-50 dark:bg-slate-800 border border-indigo-200 dark:border-indigo-700 rounded-full px-6 py-3">
          <p className="text-indigo-800 dark:text-indigo-300 font-medium">{siteStats.totalLearnersText}</p>
        </div>
      </div>

      <section className="py-6">
        <SectionHeader title="Khóa học miễn phí" viewAllLink="#" onViewAllClick={(e) => onNavigate('courses', e)} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {freeCourses.map((course) => (
            <CourseCard key={course.id} item={course} onSelectCourse={onSelectCourse} />
          ))}
        </div>
      </section>
    </>
  );
};

export default FeaturedCourses;