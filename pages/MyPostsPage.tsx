import React from 'react';
import PageHeader from '../components/ui/PageHeader';

const MyPostsPage: React.FC = () => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
            <PageHeader
                title="Bài viết của tôi"
                description="Quản lý tất cả các bài viết bạn đã chia sẻ."
            />
            <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-700">Trang quản lý bài viết</h3>
                <p className="text-slate-500 mt-1">Chức năng này đang được phát triển và sẽ sớm có mặt để bạn quản lý nội dung của mình.</p>
            </div>
        </div>
    );
};

export default MyPostsPage;
