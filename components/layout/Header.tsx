

import React, { useState, useEffect, useRef, useMemo } from 'react';
import type { User, EnrolledCourse, Course } from '../../types';
import { OfficeMasterLogo } from '../ui/OfficeMasterLogo';
import UserMenu from './UserMenu';
import NotificationDropdown from './NotificationDropdown';
import MyCoursesDropdown from './MyCoursesDropdown';
import { FaSearch, FaBell } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { notifications } from '../../data/notifications';


interface HeaderProps {
  onLogoClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onNavigate: (pageId: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
  currentUser: User | null;
  onLogout: () => void;
  onOpenAuthModal: (view: 'login' | 'register') => void;
  enrolledCourses: (EnrolledCourse & { details?: Course })[];
  onSelectCourse: (courseId: string) => void;
  theme: string;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick, onNavigate, currentUser, onLogout, onOpenAuthModal, enrolledCourses, onSelectCourse, theme, toggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNotificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [isMyCoursesOpen, setMyCoursesOpen] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);
  const myCoursesRef = useRef<HTMLDivElement>(null);
  const myCoursesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target as Node)) {
        setNotificationDropdownOpen(false);
      }
      if (myCoursesRef.current && !myCoursesRef.current.contains(event.target as Node)) {
        setMyCoursesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (myCoursesTimeoutRef.current) {
          clearTimeout(myCoursesTimeoutRef.current);
      }
    };
  }, []);

  const hasUnreadNotifications = useMemo(() => notifications.some(n => !n.isRead), []);

  const infoLinks = [
    { name: 'Giới thiệu', pageId: 'about' },
    { name: 'Liên hệ', pageId: 'support' },
    { name: 'Hỗ trợ', pageId: 'support' },
    { name: 'Điều khoản', pageId: 'terms' },
    { name: 'Bảo mật', pageId: 'privacy' },
  ];

  const handleMyCoursesMouseEnter = () => {
    if (myCoursesTimeoutRef.current) clearTimeout(myCoursesTimeoutRef.current);
    setMyCoursesOpen(true);
  };
  
  const handleMyCoursesMouseLeave = () => {
    myCoursesTimeoutRef.current = setTimeout(() => {
        setMyCoursesOpen(false);
    }, 200);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 shadow-sm dark:border-b dark:border-slate-800 h-16">
      <div className="px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center space-x-3">
            <a href="#" onClick={onLogoClick} className="flex items-center space-x-3">
              <OfficeMasterLogo />
              <span className="hidden lg:block font-semibold text-lg text-slate-800 dark:text-slate-100">Office Master</span>
            </a>
          </div>

          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <FaSearch className="w-5 h-5 text-slate-400 dark:text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm kiếm khóa học, bài viết..."
                className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-400 w-full h-11 rounded-full pl-12 pr-4 text-sm border border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2">
            {currentUser ? (
              <>
                {/* My Courses Dropdown */}
                <div 
                    className="relative hidden md:block" 
                    ref={myCoursesRef}
                    onMouseEnter={handleMyCoursesMouseEnter}
                    onMouseLeave={handleMyCoursesMouseLeave}
                >
                    <button
                        onClick={() => onNavigate('my-courses')}
                        className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        Khóa học của tôi
                    </button>
                    {isMyCoursesOpen && (
                         <MyCoursesDropdown
                            courses={enrolledCourses}
                            onNavigate={(pageId) => { onNavigate(pageId); setMyCoursesOpen(false); }}
                            onSelectCourse={(courseId) => { onSelectCourse(courseId); setMyCoursesOpen(false); }}
                        />
                    )}
                </div>

                <div className="relative" ref={notificationDropdownRef}>
                  <button
                      onClick={() => setNotificationDropdownOpen(prev => !prev)}
                      className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
                      aria-label="Thông báo"
                      aria-haspopup="true"
                      aria-expanded={isNotificationDropdownOpen}
                  >
                      <FaBell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                      {hasUnreadNotifications && (
                          <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900"></span>
                      )}
                  </button>
                  {isNotificationDropdownOpen && (
                      <NotificationDropdown 
                          onNavigate={(pageId) => { onNavigate(pageId); setNotificationDropdownOpen(false); }}
                      />
                  )}
                </div>

                <UserMenu 
                  user={currentUser} 
                  onLogout={onLogout} 
                  onNavigate={onNavigate}
                  theme={theme}
                  toggleTheme={toggleTheme}
                />
              </>
            ) : (
              <>
                <button 
                  onClick={() => onOpenAuthModal('register')}
                  className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold text-sm sm:text-base hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors hidden md:block">
                  Đăng ký
                </button>
                <button 
                  onClick={() => onOpenAuthModal('login')}
                  className="bg-indigo-600 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold text-sm sm:text-base hover:bg-indigo-700 transition-colors">
                  Đăng nhập
                </button>
              </>
            )}
            <div className="relative" ref={menuRef}>
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Tùy chọn khác"
              >
                <BsThreeDotsVertical className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-12 mt-1 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-10 py-1 z-50">
                  {infoLinks.map(link => (
                    <a
                      key={link.name}
                      href={'#'}
                      onClick={(e) => {
                        if (link.pageId) {
                            onNavigate(link.pageId, e);
                            setMenuOpen(false);
                        }
                      }}
                      className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;