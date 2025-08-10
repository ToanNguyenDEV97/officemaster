import React from 'react';
import PageHeader from '../components/ui/PageHeader';

const WriteBlogPage: React.FC = () => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
            <PageHeader
                title="Viết blog"
                description="Chia sẻ kiến thức và kinh nghiệm của bạn với cộng đồng."
            />
            <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-700">Trình soạn thảo sắp ra mắt</h3>
                <p className="text-slate-500 mt-1">Chức năng tạo bài viết blog mới đang được phát triển và sẽ sớm có mặt.</p>
            </div>
        </div>
    );
};
    
export default WriteBlogPage;