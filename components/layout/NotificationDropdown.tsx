
import React from 'react';
import { notifications } from '../../data/notifications';
import { FaArrowRight } from 'react-icons/fa';

interface NotificationDropdownProps {
  onNavigate: (pageId: string) => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onNavigate }) => {
    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <div 
            className="absolute right-0 top-full mt-2 w-96 bg-white dark:bg-slate-800 rounded-lg shadow-xl ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-10 z-50 overflow-hidden transform transition-all duration-150 ease-out origin-top-right animate-fade-in-scale"
        >
            <header className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-slate-700">
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">Thông báo {unreadCount > 0 && <span className="text-xs font-medium text-white bg-red-500 rounded-full px-2 py-0.5 ml-2">{unreadCount}</span>}</h3>
                <a href="#" onClick={(e) => { e.preventDefault(); /* Logic to mark all as read */ }} className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                    Đánh dấu đã đọc
                </a>
            </header>

            {notifications.length > 0 ? (
                <ul className="max-h-[calc(100vh-250px)] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700">
                    {notifications.map((notification) => (
                        <li key={notification.id} className={`transition-colors ${!notification.isRead ? 'bg-indigo-50/50 dark:bg-indigo-900/20' : 'bg-white dark:bg-slate-800'} hover:bg-slate-50 dark:hover:bg-slate-700`}>
                            <a href="#" className="flex items-start gap-4 p-3">
                                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-lg">
                                    {notification.icon}
                                </div>
                                <div className="flex-grow overflow-hidden">
                                    <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-100 line-clamp-1">
                                        {notification.title}
                                    </h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5 line-clamp-2">
                                        {notification.description}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                                        {notification.time}
                                    </p>
                                </div>
                                {!notification.isRead && (
                                    <div className="flex-shrink-0 w-2.5 h-2.5 bg-indigo-500 rounded-full self-center"></div>
                                )}
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="p-8 text-center">
                    <p className="text-slate-500 dark:text-slate-400">Bạn chưa có thông báo nào.</p>
                </div>
            )}
            
            <footer className="text-center p-2 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <a href="#" onClick={(e) => { e.preventDefault(); /* onNavigate('notifications'); */ }} className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center justify-center gap-2">
                    Xem tất cả thông báo
                    <FaArrowRight className="w-3 h-3" />
                </a>
            </footer>

            <style>{`
                @keyframes fade-in-scale {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in-scale {
                    animation: fade-in-scale 0.15s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default NotificationDropdown;