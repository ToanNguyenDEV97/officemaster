import React, { useState, useRef, useEffect } from 'react';
import { User } from '../../types';
import { FaMoon, FaSun, FaCog } from 'react-icons/fa';

interface UserMenuProps {
  user: User;
  onLogout: () => void;
  onNavigate: (pageId: string) => void;
  theme: string;
  toggleTheme: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout, onNavigate, theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavigate = (pageId: string) => {
    onNavigate(pageId);
    setIsOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
  };
  
  const menuItems: ({label: string, pageId?: string, action?: () => void, adminOnly?: boolean, icon?: React.ReactNode} | 'divider')[] = [
    { label: 'Trang cá nhân', pageId: 'profile' },
    { label: 'Khóa học của tôi', pageId: 'my-courses' },
    { label: 'Admin Panel', pageId: 'admin', adminOnly: true, icon: <FaCog /> },
    'divider',
    { label: 'Viết blog', pageId: 'write-blog' },
    { label: 'Bài viết của tôi', pageId: 'my-posts' },
    { label: 'Bài viết đã lưu', pageId: 'saved-posts' },
    'divider',
    { label: 'Đăng xuất', action: handleLogout },
  ];

  const canAccessAdmin = user.role === 'admin' || user.role === 'instructor';

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full p-0.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <img src={user.avatarUrl} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
      </button>

      {isOpen && (
        <div 
            className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-slate-800 rounded-lg shadow-xl ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-10 z-50 transform transition-all duration-150 ease-out origin-top-right"
            style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'scale(1)' : 'scale(0.95)',
            }}
        >
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
             <div className="flex items-center gap-3">
                <img src={user.avatarUrl} alt={user.name} className="w-11 h-11 rounded-full object-cover" />
                <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-100" role="none">{user.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400" role="none">{user.username}</p>
                </div>
            </div>
          </div>
          <nav className="py-2">
            {menuItems.map((item, index) => {
              if (item === 'divider') {
                return <hr key={index} className="my-2 border-slate-100 dark:border-slate-700" />;
              }
              if(item.adminOnly && !canAccessAdmin) {
                return null;
              }
              return (
                 <a
                    key={item.label}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      item.action ? item.action() : handleNavigate(item.pageId!);
                    }}
                    className={`flex items-center gap-3 block px-4 py-2 text-sm transition-colors rounded-md mx-2 ${
                        item.action ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 dark:text-red-400' 
                                   : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100'
                    }`}
                 >
                    {item.icon}
                    <span>{item.label}</span>
                 </a>
              );
            })}
          </nav>
          <div className="p-2 border-t border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between px-2 py-1">
                <span className="text-sm text-slate-700 dark:text-slate-300">Giao diện tối</span>
                <button
                    onClick={toggleTheme}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:ring-offset-slate-800 ${
                        theme === 'dark' ? 'bg-indigo-600' : 'bg-slate-200'
                    }`}
                >
                    <span
                        className={`pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
                        }`}
                    >
                         <span className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity ${theme === 'light' ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'}`} aria-hidden="true">
                            <FaSun className="h-3 w-3 text-slate-400" />
                        </span>
                        <span className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity ${theme === 'dark' ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'}`} aria-hidden="true">
                            <FaMoon className="h-3 w-3 text-indigo-600" />
                        </span>
                    </span>
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
