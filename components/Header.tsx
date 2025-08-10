
import React, { useState, useEffect, useRef } from 'react';
import { OfficeMasterLogo } from './ui/OfficeMasterLogo';
import { FaSearch } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';

interface HeaderProps {
  onLogoClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onNavigate: (pageId: string, e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick, onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const infoLinks = [
    { name: 'Giới thiệu', pageId: 'about' },
    { name: 'Liên hệ', pageId: 'support' },
    { name: 'Hỗ trợ', pageId: 'support' },
    { name: 'Điều khoản', pageId: 'terms' },
    { name: 'Bảo mật', pageId: 'privacy' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm h-16">
      <div className="px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center space-x-3">
            <a href="#" onClick={onLogoClick} className="flex items-center space-x-3">
              <OfficeMasterLogo />
              <span className="hidden lg:block font-semibold text-lg text-slate-800">Office Master</span>
            </a>
          </div>

          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <FaSearch className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm kiếm khóa học, bài viết..."
                className="bg-slate-100 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-400 w-full h-11 rounded-full pl-12 pr-4 text-sm border border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <a href="#" className="bg-slate-100 text-slate-800 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold text-sm sm:text-base hover:bg-slate-200 transition-colors hidden md:block">
              Đăng ký
            </a>
            <a href="#" className="bg-indigo-600 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold text-sm sm:text-base hover:bg-indigo-700 transition-colors">
              Đăng nhập
            </a>
            <div className="relative" ref={menuRef}>
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Tùy chọn khác"
              >
                <BsThreeDotsVertical className="w-5 h-5 text-slate-600" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-12 mt-1 w-48 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 py-1 z-50">
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
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
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
