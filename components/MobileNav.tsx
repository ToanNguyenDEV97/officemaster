
import React from 'react';
import { FaHome, FaRoad, FaQuestionCircle, FaBuilding } from 'react-icons/fa';
import { IoNewspaperSharp } from 'react-icons/io5';

interface MobileNavProps {
    currentPage: string;
    onNavigate: (page: string, e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const navLinks = [
    { name: 'Trang chủ', icon: FaHome, href: '#', pageId: 'home' },
    { name: 'Lộ trình', icon: FaRoad, href: '#', pageId: 'learning-paths' },
    { name: 'Bài viết', icon: IoNewspaperSharp, href: '#', pageId: 'blog' },
    { name: 'Giới thiệu', icon: FaBuilding, href: '#', pageId: 'about' },
    { name: 'Hỗ trợ', icon: FaQuestionCircle, href: '#', pageId: 'support' },
];

const MobileNav: React.FC<MobileNavProps> = ({ currentPage, onNavigate }) => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 lg:hidden z-40">
            <ul className="flex justify-around items-center h-full">
                {navLinks.map(link => {
                    const isActive = link.pageId === currentPage;
                    return (
                        <li key={link.name} className="flex-1">
                            <a
                                href={link.href}
                                className={`flex flex-col items-center justify-center space-y-1 w-full h-full transition-colors ${
                                    isActive ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-600'
                                }`}
                                onClick={(e) => link.pageId && onNavigate(link.pageId, e)}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                <link.icon className="h-6 w-6" />
                                <span className={`text-xs ${isActive ? 'font-semibold' : 'font-medium'}`}>{link.name}</span>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default MobileNav;
