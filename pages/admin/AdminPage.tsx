import React, { useState } from 'react';
import type { User, Course } from '../../types';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { FaBars, FaTimes } from 'react-icons/fa';
import Dashboard from './Dashboard';
import ManageCoursesPage from './ManageCoursesPage';
// Import other admin pages here as they are created
// import ManagePostsPage from './ManagePostsPage';
// import ManageUsersPage from './ManageUsersPage';

interface AdminPageProps {
  currentUser: User;
  onNavigate: (pageId: string) => void;
  theme: string;
  toggleTheme: () => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ currentUser, onNavigate, theme, toggleTheme }) => {
  const [activeAdminPage, setActiveAdminPage] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const renderAdminContent = () => {
    switch(activeAdminPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'courses':
        return <ManageCoursesPage />;
      // case 'posts':
      //   return <ManagePostsPage />;
      // ... other cases
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900">
      <AdminSidebar 
        activePage={activeAdminPage} 
        onNavigate={(page) => {
            setActiveAdminPage(page)
            setSidebarOpen(false);
        }}
        onExitAdmin={() => onNavigate('home')}
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 bg-white dark:bg-slate-800 shadow-md z-10">
           <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden text-slate-600 dark:text-slate-300">
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
           </button>
           <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Admin Panel</h1>
           <div className="flex items-center gap-4">
              <span className="text-sm hidden sm:block">Chào, <span className="font-bold">{currentUser.name}</span></span>
              <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-9 h-9 rounded-full"/>
           </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {renderAdminContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPage;