
import React from 'react';
import { FaHome, FaRoad, FaQuestionCircle, FaBuilding } from 'react-icons/fa';
import { IoNewspaperSharp } from 'react-icons/io5';

interface SidebarProps {
    currentPage: string;
    onNavigate: (page: string, e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const mainLinks = [
    { name: 'Trang chủ', icon: FaHome, href: '#', pageId: 'home' },
    { name: 'Lộ trình', icon: FaRoad, href: '#', pageId: 'learning-paths' },
    { name: 'Bài viết', icon: IoNewspaperSharp, href: '#', pageId: 'blog' },
    { name: 'Giới thiệu', icon: FaBuilding, href: '#', pageId: 'about' },
    { name: 'Hỗ trợ', icon: FaQuestionCircle, href: '#', pageId: 'support' },
];

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {

    return (
        <aside className="hidden lg:flex fixed top-16 left-0 h-[calc(100%-4rem)] bg-white w-20 flex-col items-center z-40 border-r border-slate-200 py-2">
            <nav className="w-full">
                <ul className="space-y-1">
                    {mainLinks.map(link => {
                        const isActive = link.pageId === currentPage;
                        return (
                            <li key={link.name} className="px-2">
                                <a
                                    href={link.href}
                                    title={link.name} // Tooltip for accessibility
                                    className={`flex flex-col items-center justify-center rounded-xl transition-colors w-full h-20 text-center group ${
                                        isActive 
                                        ? 'bg-indigo-50 text-indigo-600 font-semibold' 
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium'
                                    }`}
                                    onClick={(e) => link.pageId && onNavigate(link.pageId, e)}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    <link.icon className="h-6 w-6" />
                                    <span className="text-xs mt-1.5">{link.name}</span>
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
