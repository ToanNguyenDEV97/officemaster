
import React, { useState, useEffect } from 'react';
import type { Course } from '../../types';
import CourseForm from '../../components/admin/CourseForm';
import Modal from '../../components/ui/Modal';
import { FaPlus, FaEdit, FaTrash, FaSpinner } from 'react-icons/fa';

const ManageCoursesPage: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

    const fetchCourses = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/v1/courses');
            if (!res.ok) throw new Error('Failed to fetch courses');
            const data = await res.json();
            setCourses([...data.pro, ...data.free]);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleAdd = () => {
        setSelectedCourse(null);
        setIsFormOpen(true);
    };

    const handleEdit = (course: Course) => {
        setSelectedCourse(course);
        setIsFormOpen(true);
    };

    const handleDelete = (course: Course) => {
        setCourseToDelete(course);
        setIsDeleteModalOpen(true);
    };
    
    const confirmDelete = async () => {
        if (!courseToDelete || !courseToDelete.id) return;
        try {
             const res = await fetch(`/api/v1/courses?id=${courseToDelete.id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete course');
            setCourses(prev => prev.filter(c => c.id !== courseToDelete.id));
        } catch(err: any) {
            setError(err.message);
        } finally {
            setIsDeleteModalOpen(false);
            setCourseToDelete(null);
        }
    };

    const handleFormSubmit = async (courseData: Course) => {
        const isEditing = !!courseData.id;
        const url = isEditing ? `/api/v1/courses?id=${courseData.id}` : '/api/v1/courses';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(courseData),
            });
            if (!res.ok) throw new Error(`Failed to ${isEditing ? 'update' : 'create'} course`);
            
            await fetchCourses(); // Refetch all courses to get the latest data
        } catch(err: any) {
            setError(err.message);
        } finally {
            setIsFormOpen(false);
        }
    };

    if (isLoading) return <div className="flex justify-center items-center h-64"><FaSpinner className="animate-spin text-4xl text-indigo-500" /></div>;
    if (error) return <div className="text-red-500 bg-red-100 p-4 rounded-lg">Error: {error}</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Quản lý Khóa học</h1>
                <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700">
                    <FaPlus /> Thêm khóa học
                </button>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
                        <thead className="text-xs text-slate-700 dark:text-slate-300 uppercase bg-slate-50 dark:bg-slate-700">
                            <tr>
                                <th scope="col" className="px-6 py-3">ID</th>
                                <th scope="col" className="px-6 py-3">Tiêu đề</th>
                                <th scope="col" className="px-6 py-3">Giảng viên</th>
                                <th scope="col" className="px-6 py-3">Loại</th>
                                <th scope="col" className="px-6 py-3 text-right">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map(course => (
                                <tr key={course.id} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600">
                                    <td className="px-6 py-4 truncate max-w-[100px]">{course.id}</td>
                                    <th scope="row" className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">{course.title}</th>
                                    <td className="px-6 py-4">{course.instructorName}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${course.isPro ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                            {course.isPro ? 'Pro' : 'Free'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button onClick={() => handleEdit(course)} className="p-2 text-blue-500 hover:bg-blue-100 rounded-full"><FaEdit /></button>
                                        <button onClick={() => handleDelete(course)} className="p-2 text-red-500 hover:bg-red-100 rounded-full"><FaTrash /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isFormOpen && (
                <CourseForm 
                    isOpen={isFormOpen} 
                    onClose={() => setIsFormOpen(false)} 
                    onSubmit={handleFormSubmit}
                    initialData={selectedCourse}
                />
            )}
            
            {isDeleteModalOpen && courseToDelete && (
                 <Modal 
                    isOpen={isDeleteModalOpen} 
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                    title="Xác nhận Xóa"
                >
                   Bạn có chắc chắn muốn xóa khóa học "{courseToDelete.title}" không? Hành động này không thể hoàn tác.
                </Modal>
            )}
        </div>
    );
};

export default ManageCoursesPage;