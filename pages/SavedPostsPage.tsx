import React from 'react';
import PageHeader from '../components/ui/PageHeader';

const SavedPostsPage: React.FC = () => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
            <PageHeader
                title="Bài viết đã lưu"
                description="Danh sách các bài viết bạn đã lưu để đọc lại sau."
            />
            <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-700">Chưa có bài viết nào được lưu</h3>
                <p className="text-slate-500 mt-1">Khi bạn tìm thấy một bài viết thú vị, hãy lưu lại để xem sau tại đây. Chức năng này đang được phát triển.</p>
            </div>
        </div>
    );
};

export default SavedPostsPage;
