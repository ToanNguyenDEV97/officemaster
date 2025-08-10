
import React from 'react';
import { FaUser, FaBook, FaCog, FaSignOutAlt } from 'react-icons/fa';

interface ProfileSidebarProps {
    activePage: 'profile' | 'my-courses' | 'settings';
    onNavigate: (pageId: string) => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ activePage, onNavigate }) => {

    const navItems = [
        { id: 'profile', label: 'Thông tin cá nhân', icon: FaUser },
        { id: 'my-courses', label: 'Khóa học của tôi', icon: FaBook },
        { id: 'settings', label: 'Cài đặt', icon: FaCog },
        { id: 'logout', label: 'Đăng xuất', icon: FaSignOutAlt },
    ];

    const handleNavigation = (pageId: string) => {
        if (pageId === 'logout') {
            // This would typically be handled by a global state/context,
            // but for now we navigate to home which will trigger logout in App.tsx
            console.log("Logout action initiated from sidebar");
        } else {
            onNavigate(pageId);
        }
    }

    return (
        <aside className="lg:col-span-1">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
                <nav className="space-y-1">
                    {navItems.map(item => {
                        const isActive = activePage === item.id;
                        return (
                             <a
                                key={item.id}
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavigation(item.id);
                                }}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                                    isActive 
                                    ? 'bg-indigo-50 text-indigo-700' 
                                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                                } ${
                                    item.id === 'logout' ? 'text-red-600 hover:bg-red-50' : ''
                                }`}
                            >
                                <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-indigo-600' : 'text-slate-500'} ${item.id === 'logout' ? 'text-red-500' : ''}`} />
                                <span>{item.label}</span>
                            </a>
                        )
                    })}
                </nav>
            </div>
        </aside>
    );
};

export default ProfileSidebar;
