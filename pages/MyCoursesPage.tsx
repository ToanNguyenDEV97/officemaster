

import React, { useState, useMemo } from 'react';
import type { User, Course, EnrolledCourse } from '../types';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import MyCourseCard from '../components/cards/MyCourseCard';
import { FaSearch } from 'react-icons/fa';

interface MyCoursesPageProps {
    user: User;
    enrolledCoursesData: (EnrolledCourse & { details?: Course })[];
    onSelectCourse: (courseId: string) => void;
    onNavigate: (pageId: string) => void;
}

type Tab = 'all' | 'in-progress' | 'completed';

const MyCoursesPage: React.FC<MyCoursesPageProps> = ({ user, enrolledCoursesData, onSelectCourse, onNavigate }) => {
    const [activeTab, setActiveTab] = useState<Tab>('in-progress');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCourses = useMemo(() => {
        let courses = enrolledCoursesData;

        // Filter by tab
        if (activeTab === 'in-progress') {
            courses = courses.filter(c => !c.completed);
        } else if (activeTab === 'completed') {
            courses = courses.filter(c => c.completed);
        }

        // Filter by search term
        if (searchTerm) {
            courses = courses.filter(c => 
                c.details?.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        return courses;
    }, [enrolledCoursesData, activeTab, searchTerm]);

    const tabs: { id: Tab; label: string }[] = [
        { id: 'in-progress', label: 'Đang học' },
        { id: 'completed', label: 'Đã hoàn thành' },
        { id: 'all', label: 'Tất cả' },
    ];
    
    return (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
            <ProfileSidebar activePage="my-courses" onNavigate={onNavigate} />
            
            <div className="lg:col-span-3">
                 <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <h1 className="text-2xl font-bold text-slate-800">Khóa học của tôi</h1>
                         <div className="relative w-full md:w-auto md:min-w-[300px]">
                            <FaSearch className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm khóa học..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-slate-100 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-400 w-full h-10 rounded-full pl-10 pr-4 text-sm border border-transparent"
                            />
                        </div>
                    </div>

                    <div className="border-b border-slate-200 mb-6">
                        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`${
                                    activeTab === tab.id
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                    } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {filteredCourses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredCourses.map(course => (
                                course.details && <MyCourseCard key={course.courseId} course={course.details} progress={course.progress} onSelectCourse={onSelectCourse} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-lg">
                            <h3 className="text-lg font-semibold text-slate-700">Bạn chưa có khóa học nào</h3>
                            <p className="text-slate-500 mt-1 mb-4">Hãy bắt đầu hành trình chinh phục kỹ năng của mình ngay hôm nay!</p>
                             <button
                                onClick={() => onNavigate('home')}
                                className="bg-indigo-600 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-indigo-700 transition-all duration-300 text-sm"
                            >
                                Khám phá các khóa học
                            </button>
                        </div>
                    )}
                 </div>
            </div>
        </div>
    );
};

export default MyCoursesPage;