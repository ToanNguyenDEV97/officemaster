import React from 'react';
import { FaBook, FaUsers, FaNewspaper, FaChartBar } from 'react-icons/fa';

const StatCard: React.FC<{icon: React.ReactNode, title: string, value: string, color: string}> = ({ icon, title, value, color }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow flex items-center">
        <div className={`p-3 rounded-full mr-4 ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{value}</p>
        </div>
    </div>
)

const Dashboard: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Bảng điều khiển</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={<FaBook className="text-white"/>} title="Tổng số khóa học" value="12" color="bg-blue-500" />
                <StatCard icon={<FaUsers className="text-white"/>} title="Tổng số người dùng" value="450K+" color="bg-green-500" />
                <StatCard icon={<FaNewspaper className="text-white"/>} title="Tổng số bài viết" value="25" color="bg-yellow-500" />
                <StatCard icon={<FaChartBar className="text-white"/>} title="Lượt truy cập hôm nay" value="1,234" color="bg-red-500" />
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
                 <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Chào mừng trở lại!</h2>
                 <p className="mt-2 text-slate-600 dark:text-slate-300">Đây là trung tâm quản lý của bạn. Từ đây, bạn có thể quản lý khóa học, bài viết, người dùng và xem các số liệu thống kê quan trọng của trang web. Hãy chọn một mục từ thanh điều hướng bên trái để bắt đầu.</p>
            </div>
        </div>
    );
};

export default Dashboard;
