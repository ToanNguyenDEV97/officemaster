
import React, { useState, useEffect } from 'react';
import type { Course } from '../../types';
import { FaTimes } from 'react-icons/fa';

interface CourseFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (course: Course) => void;
    initialData?: Course | null;
}

const CourseForm: React.FC<CourseFormProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [course, setCourse] = useState<Course>(
        initialData || {
            id: '',
            title: '',
            tagline: '',
            imageUrl: '',
            isPro: false,
            instructorName: '',
            instructorAvatarUrl: '',
            lessons: 0,
            duration: '',
        }
    );

    useEffect(() => {
        setCourse(
            initialData || {
                id: '',
                title: '',
                tagline: '',
                imageUrl: '',
                isPro: false,
                instructorName: '',
                instructorAvatarUrl: '',
                lessons: 0,
                duration: '',
            }
        );
    }, [initialData, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        if (type === 'checkbox') {
             setCourse({ ...course, [name]: (e.target as HTMLInputElement).checked });
        } else if (type === 'number') {
            setCourse({ ...course, [name]: parseFloat(value) || 0 });
        } else {
            setCourse({ ...course, [name]: value });
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(course);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b dark:border-slate-700">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                        {initialData ? 'Chỉnh sửa Khóa học' : 'Thêm Khóa học Mới'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full"><FaTimes /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Tiêu đề</label>
                            <input type="text" name="title" id="title" value={course.title} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-slate-700" />
                        </div>
                        <div>
                            <label htmlFor="tagline" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Tagline</label>
                            <input type="text" name="tagline" id="tagline" value={course.tagline} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-slate-700" />
                        </div>
                         <div>
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-slate-700 dark:text-slate-300">URL Hình ảnh</label>
                            <input type="text" name="imageUrl" id="imageUrl" value={course.imageUrl} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-slate-700" />
                        </div>
                         <div>
                            <label htmlFor="instructorName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Tên Giảng viên</label>
                            <input type="text" name="instructorName" id="instructorName" value={course.instructorName} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-slate-700" />
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Giá</label>
                            <input type="number" name="price" id="price" value={course.price || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-slate-700" />
                        </div>
                         <div>
                            <label htmlFor="oldPrice" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Giá cũ</label>
                            <input type="number" name="oldPrice" id="oldPrice" value={course.oldPrice || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-slate-700" />
                        </div>
                        <div>
                            <label htmlFor="lessons" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Số bài học</label>
                            <input type="number" name="lessons" id="lessons" value={course.lessons} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-slate-700" />
                        </div>
                        <div>
                            <label htmlFor="duration" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Thời lượng</label>
                            <input type="text" name="duration" id="duration" value={course.duration} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-slate-700" />
                        </div>
                    </div>
                     <div className="flex items-center">
                        <input type="checkbox" name="isPro" id="isPro" checked={course.isPro} onChange={handleChange} className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                        <label htmlFor="isPro" className="ml-2 block text-sm text-slate-900 dark:text-slate-200">Khóa học Pro</label>
                    </div>
                </form>
                <div className="p-4 bg-slate-50 dark:bg-slate-700/50 border-t dark:border-slate-700 flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-100 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 font-semibold">Hủy</button>
                    <button type="submit" onClick={handleSubmit} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold">{initialData ? 'Lưu thay đổi' : 'Tạo khóa học'}</button>
                </div>
            </div>
        </div>
    );
};

export default CourseForm;