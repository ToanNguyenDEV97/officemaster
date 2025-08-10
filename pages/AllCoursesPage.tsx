

import React, { useState, useMemo } from 'react';
import type { Course } from '../types';
import CourseCard from '../components/cards/CourseCard';
import PageHeader from '../components/ui/PageHeader';
import { FaSearch } from 'react-icons/fa';

interface AllCoursesPageProps {
  allCourses: Course[];
  onSelectCourse: (id: string) => void;
}

const AllCoursesPage: React.FC<AllCoursesPageProps> = ({ allCourses, onSelectCourse }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLevel, setActiveLevel] = useState('Tất cả');
  const [activeFormat, setActiveFormat] = useState('Tất cả');

  const levels = useMemo(() => ['Tất cả', 'Cơ bản', 'Trung bình', 'Nâng cao'], []);
  const formats = ['Tất cả', 'Pro', 'Miễn phí'];

  const filteredCourses = useMemo(() => {
    return allCourses.filter(course => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const matchesSearch = course.title.toLowerCase().includes(lowerCaseSearchTerm) || 
                            (course.instructorName && course.instructorName.toLowerCase().includes(lowerCaseSearchTerm));
      
      const matchesLevel = activeLevel === 'Tất cả' || course.level === activeLevel;
      
      const matchesFormat = activeFormat === 'Tất cả' 
        || (activeFormat === 'Pro' && course.isPro) 
        || (activeFormat === 'Miễn phí' && !course.isPro);
      
      return matchesSearch && matchesLevel && matchesFormat;
    });
  }, [allCourses, searchTerm, activeLevel, activeFormat]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
      <div className="p-6 md:p-8">
        <PageHeader
          title="Tất cả Khóa học"
          description="Khám phá toàn bộ các khóa học của chúng tôi. Sử dụng bộ lọc để tìm kiếm khóa học phù hợp nhất với bạn."
        />
      </div>

      {/* Filter Bar */}
      <div className="sticky top-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-10 py-4 px-6 md:px-8 border-b border-t border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              {/* Search Input */}
              <div className="relative w-full md:col-span-2">
                  <FaSearch className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                      type="text"
                      placeholder="Tìm kiếm theo tên khóa học, giảng viên..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-400 w-full h-11 rounded-md pl-10 pr-4 text-sm border border-slate-300 dark:border-slate-700"
                  />
              </div>

              {/* Format Select */}
              <div>
                  <label htmlFor="format-filter" className="sr-only">Định dạng</label>
                  <select id="format-filter" value={activeFormat} onChange={e => setActiveFormat(e.target.value)} className="w-full h-11 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm">
                      {formats.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
              </div>

              {/* Level Select */}
              <div>
                  <label htmlFor="level-filter" className="sr-only">Trình độ</label>
                  <select id="level-filter" value={activeLevel} onChange={e => setActiveLevel(e.target.value)} className="w-full h-11 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm">
                      {levels.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
              </div>
          </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="mb-4">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold">
            Tìm thấy <span className="text-indigo-600 dark:text-indigo-400">{filteredCourses.length}</span> trên tổng số <span className="text-indigo-600 dark:text-indigo-400">{allCourses.length}</span> khóa học.
          </p>
        </div>
        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCourses.map(course => (
                    <CourseCard key={course.id} item={course} onSelectCourse={onSelectCourse} />
                ))}
            </div>
        ) : (
            <div className="text-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">Không tìm thấy khóa học phù hợp</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Vui lòng thử lại với từ khóa hoặc bộ lọc khác.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default AllCoursesPage;