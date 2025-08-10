import React from 'react';
import { FaTachometerAlt, FaBook, FaPenSquare, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import { OfficeMasterLogo } from '../ui/OfficeMasterLogo';

interface AdminSidebarProps {
    activePage: string;
    onNavigate: (page: string) => void;
    onExitAdmin: () => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activePage, onNavigate, onExitAdmin, isOpen, setIsOpen }) => {
    
    const navItems = [
        { id: 'dashboard', label: 'Tổng quan', icon: FaTachometerAlt },
        { id: 'courses', label: 'Quản lý Khóa học', icon: FaBook },
        { id: 'posts', label: 'Quản lý Bài viết', icon: FaPenSquare },
        { id: 'users', label: 'Quản lý Người dùng', icon: FaUsers },
    ];

    const NavLink: React.FC<{item: typeof navItems[0]}> = ({ item }) => {
        const isActive = activePage === item.id;
        return (
            <li>
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        onNavigate(item.id);
                    }}
                    className={`flex items-center p-3 text-base font-normal rounded-lg transition-colors ${
                        isActive 
                        ? 'bg-indigo-600 text-white' 
                        : 'text-slate-100 hover:bg-slate-700'
                    }`}
                >
                    <item.icon className={`w-6 h-6 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                    <span className="ml-3">{item.label}</span>
                </a>
            </li>
        )
    }

    return (
        <>
            <aside className={`fixed lg:relative z-20 w-64 h-screen bg-slate-800 text-white flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-center p-5 border-b border-slate-700">
                        <OfficeMasterLogo color1="#a5b4fc" color2="#e0e7ff" />
                        <span className="text-xl font-semibold ml-3">Admin Panel</span>
                    </div>

                    <nav className="flex-1 px-3 py-4 overflow-y-auto">
                        <ul className="space-y-2">
                           {navItems.map(item => <NavLink key={item.id} item={item} />)}
                        </ul>
                    </nav>

                    <div className="p-3 border-t border-slate-700">
                         <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                onExitAdmin();
                            }}
                            className="flex items-center p-3 text-base font-normal rounded-lg transition-colors text-slate-100 hover:bg-slate-700"
                        >
                            <FaSignOutAlt className="w-6 h-6 text-slate-400" />
                            <span className="ml-3">Thoát Admin</span>
                        </a>
                    </div>
                </div>
            </aside>
            {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/50 z-10 lg:hidden"></div>}
        </>
    );
};

export default AdminSidebar;
