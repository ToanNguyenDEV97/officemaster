
import React, { useState, useMemo, useEffect } from 'react';
import type { User, EnrolledCourse, Course, ForumTopic, LearningPath, BlogPost, ForumCategory, ForumReply } from './types';

// Layout Components
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import InfoSidebar from './components/layout/InfoSidebar';
import Footer from './components/layout/Footer';
import MobileNav from './components/layout/MobileNav';
import AuthModal from './components/auth/AuthModal';

// Page Components
import HomePage from './pages/HomePage';
import LearningPathsPage from './pages/LearningPathsPage';
import AllCoursesPage from './pages/AllCoursesPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import SupportPage from './pages/SupportPage';
import AboutPage from './pages/AboutPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import LearningPathDetailPage from './pages/LearningPathDetailPage';
import CourseDetailPage from './pages/CourseDetailPage';
import ProfilePage from './pages/ProfilePage';
import MyCoursesPage from './pages/MyCoursesPage';
import WriteBlogPage from './pages/WriteBlogPage';
import MyPostsPage from './pages/MyPostsPage';
import SavedPostsPage from './pages/SavedPostsPage';
import LearningPage from './pages/LearningPage';
import ForumPage from './pages/ForumPage';
import ForumTopicDetailPage from './pages/ForumTopicDetailPage';
import CreateTopicPage from './pages/CreateTopicPage';
import AdminPage from './pages/admin/AdminPage';

// Data
import { FaSpinner } from 'react-icons/fa';

interface AppData {
  learningPaths: LearningPath[];
  proCourses: Course[];
  freeCourses: Course[];
  blogPosts: BlogPost[];
  forumCategories: ForumCategory[];
  forumTopics: ForumTopic[];
  forumReplies: { [key: string]: ForumReply[] };
  allUsers: User[];
  allCourses: Course[];
}

const LoadingScreen: React.FC = () => (
    <div className="fixed inset-0 bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center text-slate-700 dark:text-slate-300">
        <FaSpinner className="animate-spin text-4xl text-indigo-500" />
        <p className="mt-4 text-lg font-semibold">Đang tải dữ liệu ứng dụng...</p>
    </div>
);

const ErrorScreen: React.FC<{ message: string }> = ({ message }) => (
    <div className="fixed inset-0 bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center text-slate-700 dark:text-slate-300 p-8 text-center">
        <svg className="w-16 h-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Lỗi tải dữ liệu</h2>
        <p className="max-w-md mb-4">{message}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
            Hãy chắc chắn rằng server backend của bạn đang hoạt động và đã kết nối thành công tới cơ sở dữ liệu MongoDB. Kiểm tra file <code className="bg-slate-200 dark:bg-slate-700 font-mono p-1 rounded">.env</code> và console của server.
        </p>
    </div>
);

const App: React.FC = () => {
  // Navigation and Selection State
  const [page, setPage] = useState('home');
  const [selectedLearningPathId, setSelectedLearningPathId] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedBlogPostId, setSelectedBlogPostId] = useState<string | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  
  // Data State
  const [appData, setAppData] = useState<AppData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [forumTopics, setForumTopics] = useState<ForumTopic[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<(EnrolledCourse & { details: Course })[]>([]);

  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialView, setAuthInitialView] = useState<'login' | 'register'>('login');

  // Theme State
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  
  // Main Data Fetching Effect
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const [
          pathsRes,
          coursesRes,
          postsRes,
          usersRes,
          forumRes
        ] = await Promise.all([
          fetch('/api/v1/paths'),
          fetch('/api/v1/courses'),
          fetch('/api/v1/posts'),
          fetch('/api/v1/users'),
          fetch('/api/v1/forum'),
        ]);

        if (!pathsRes.ok || !coursesRes.ok || !postsRes.ok || !usersRes.ok || !forumRes.ok) {
          throw new Error('Failed to fetch API data. Make sure the backend server is running and connected to the database.');
        }

        const learningPathsData = await pathsRes.json();
        const coursesData = await coursesRes.json();
        const blogPostsData = await postsRes.json();
        const usersData = await usersRes.json();
        const forumData = await forumRes.json();

        const allCourses: Course[] = [...coursesData.pro, ...coursesData.free];

        const loadedData: AppData = {
          learningPaths: learningPathsData,
          proCourses: coursesData.pro,
          freeCourses: coursesData.free,
          allCourses: allCourses,
          blogPosts: blogPostsData,
          allUsers: usersData.all,
          forumCategories: forumData.categories,
          forumTopics: forumData.topics,
          forumReplies: forumData.replies,
        };
        
        setAppData(loadedData);
        setForumTopics(loadedData.forumTopics);

      } catch (error) {
        console.error("Failed to fetch application data from API:", error);
        setFetchError('Không thể kết nối đến máy chủ. Vui lòng đảm bảo server backend đang chạy và đã kết nối với cơ sở dữ liệu MongoDB.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  
  // Update enrollments when user logs in
  useEffect(() => {
      const loadUserEnrollments = async () => {
          if (!currentUser || !appData) return;
          
          try {
            const res = await fetch(`/api/v1/enrollments?userId=${currentUser.id}`);
            if (!res.ok) throw new Error('Failed to fetch enrollments from API');
            const userEnrollmentsData: EnrolledCourse[] = await res.json();
            
            const populatedEnrollments = userEnrollmentsData
                .map(enrolledCourse => {
                    const courseDetails = appData.allCourses.find(c => c.id === enrolledCourse.courseId);
                    return courseDetails ? { ...enrolledCourse, details: courseDetails } : null;
                })
                .filter(Boolean) as (EnrolledCourse & { details: Course })[];
            
            setEnrolledCourses(populatedEnrollments);

          } catch (error) {
              console.error("Failed to fetch user enrollments:", error);
          }
      };

      loadUserEnrollments();
  }, [currentUser, appData]);


  // Theme effect
  useEffect(() => {
      const root = window.document.documentElement;
      const isDark = theme === 'dark';
      root.classList.toggle('dark', isDark);
      localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleOpenAuthModal = (view: 'login' | 'register') => {
    setAuthInitialView(view);
    setAuthModalOpen(true);
  };
  
  const handleCloseAuthModal = () => setAuthModalOpen(false);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    handleCloseAuthModal();
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setEnrolledCourses([]);
    handleNavigate('home');
  };

  const handleNavigate = (pageName: string, e?: React.MouseEvent<HTMLAnchorElement>) => {
      if (e) e.preventDefault();
      setPage(pageName);
      setSelectedLearningPathId(null);
      setSelectedCourseId(null);
      setSelectedBlogPostId(null);
      setSelectedTopicId(null);
      window.scrollTo(0, 0);
  };

  const handleSelectPath = (pathId: string) => {
    setSelectedLearningPathId(pathId);
    setPage('learning-path-detail');
    window.scrollTo(0, 0);
  };

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setPage('course-detail');
    window.scrollTo(0, 0);
  };
  
  const handleStartLearning = (courseId: string) => {
    setSelectedCourseId(courseId);
    setPage('learning');
    window.scrollTo(0, 0);
  };

  const handleSelectBlogPost = (postId: string) => {
    setSelectedBlogPostId(postId);
    setPage('blog-detail');
    window.scrollTo(0, 0);
  };

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    setPage('forum-topic-detail');
    window.scrollTo(0, 0);
  };
  
  const handleTopicCreated = (newTopic: Omit<ForumTopic, 'id' | 'repliesCount' | 'viewsCount' | 'createdAt'>) => {
      // In a real app, this would be a POST request to the API
      // For now, we update the state locally
      const topic: ForumTopic = {
          ...newTopic,
          id: String(Date.now()),
          repliesCount: 0,
          viewsCount: 0,
          createdAt: new Date().toISOString(),
          isPinned: false,
          isLocked: false,
      };
      setForumTopics(prev => [topic, ...prev]);
      if (appData) {
          setAppData({...appData, forumTopics: [topic, ...appData.forumTopics]})
      }
      setTimeout(() => handleSelectTopic(topic.id), 100);
  }
  
  const allCourses = useMemo(() => {
    if (!appData) return [];
    return appData.allCourses;
  }, [appData]);

  if (fetchError) {
      return <ErrorScreen message={fetchError} />;
  }

  if (isLoading || !appData) {
      return <LoadingScreen />;
  }
  
  // Admin Page Route Guard
  const canAccessAdmin = currentUser?.role === 'admin' || currentUser?.role === 'instructor';
  if (page.startsWith('admin') && !canAccessAdmin) {
      setPage('home'); 
      return <LoadingScreen />;
  }
  if (page.startsWith('admin')) {
      return (
          <AdminPage
              currentUser={currentUser!}
              onNavigate={handleNavigate} 
              theme={theme}
              toggleTheme={toggleTheme}
          />
      );
  }

  const selectedPath = selectedLearningPathId ? appData.learningPaths.find(p => p.id === selectedLearningPathId) : null;
  const selectedCourse = selectedCourseId ? allCourses.find(c => c.id === selectedCourseId) : null;
  const selectedBlogPost = selectedBlogPostId ? appData.blogPosts.find(p => p.id === selectedBlogPostId) : null;
  const selectedTopic = selectedTopicId ? forumTopics.find(t => t.id === selectedTopicId) : null;
  const topicReplies = selectedTopicId ? (appData.forumReplies[selectedTopicId] || []) : [];
  
  if (page === 'learning' && selectedCourse) {
    return <LearningPage course={selectedCourse} onNavigate={handleNavigate} theme={theme} toggleTheme={toggleTheme} />;
  }
  
  const renderPage = () => {
    switch(page) {
      case 'home':
        return <HomePage onSelectCourse={handleSelectCourse} onNavigate={handleNavigate} onSelectPath={handleSelectPath} onSelectBlogPost={handleSelectBlogPost} learningPaths={appData.learningPaths} proCourses={appData.proCourses} freeCourses={appData.freeCourses} blogPosts={appData.blogPosts} />;
      case 'learning-paths':
        return <LearningPathsPage onSelectPath={handleSelectPath} learningPaths={appData.learningPaths} />;
      case 'courses':
        return <AllCoursesPage allCourses={allCourses} onSelectCourse={handleSelectCourse} />;
      case 'learning-path-detail':
        return selectedPath && <LearningPathDetailPage path={selectedPath} onNavigate={handleNavigate} onSelectCourse={handleSelectCourse} />;
      case 'course-detail':
        return selectedCourse && <CourseDetailPage course={selectedCourse} onNavigate={handleNavigate} pathContext={selectedPath} onSelectPath={handleSelectPath} currentUser={currentUser} onOpenAuthModal={() => handleOpenAuthModal('login')} />;
      case 'blog':
        return <BlogPage onSelectBlogPost={handleSelectBlogPost} blogPosts={appData.blogPosts} />;
      case 'blog-detail':
        return selectedBlogPost && <BlogDetailPage post={selectedBlogPost} allPosts={appData.blogPosts} onNavigate={handleNavigate} onSelectBlogPost={handleSelectBlogPost} currentUser={currentUser} onOpenAuthModal={() => handleOpenAuthModal('login')} />;
      case 'forum':
        return <ForumPage categories={appData.forumCategories} topics={forumTopics} users={appData.allUsers} onSelectTopic={handleSelectTopic} onNavigate={handleNavigate} currentUser={currentUser} onOpenAuthModal={() => handleOpenAuthModal('login')} />;
      case 'forum-topic-detail':
        return selectedTopic && <ForumTopicDetailPage topic={selectedTopic} users={appData.allUsers} categories={appData.forumCategories} replies={topicReplies} onNavigate={handleNavigate} currentUser={currentUser} onOpenAuthModal={() => handleOpenAuthModal('login')} />;
      case 'create-topic':
        return currentUser && <CreateTopicPage categories={appData.forumCategories} currentUser={currentUser} onTopicCreated={handleTopicCreated} onNavigate={handleNavigate} />;
      case 'support':
        return <SupportPage />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'terms':
        return <TermsPage onNavigate={handleNavigate} />;
      case 'privacy':
        return <PrivacyPage onNavigate={handleNavigate} />;
      case 'profile':
        return currentUser && <ProfilePage user={currentUser} onUpdateUser={setCurrentUser} onNavigate={handleNavigate} />;
      case 'my-courses':
        return currentUser && <MyCoursesPage user={currentUser} enrolledCoursesData={enrolledCourses} onSelectCourse={handleStartLearning} onNavigate={handleNavigate} />;
      case 'write-blog':
        return currentUser && <WriteBlogPage />;
      case 'my-posts':
        return currentUser && <MyPostsPage />;
      case 'saved-posts':
        return currentUser && <SavedPostsPage />;
      default:
        return <HomePage onSelectCourse={handleSelectCourse} onNavigate={handleNavigate} onSelectPath={handleSelectPath} onSelectBlogPost={handleSelectBlogPost} learningPaths={appData.learningPaths} proCourses={appData.proCourses} freeCourses={appData.freeCourses} blogPosts={appData.blogPosts} />;
    }
  };
  
  const isUserPage = ['profile', 'my-courses', 'write-blog', 'my-posts', 'saved-posts'].includes(page);
  const isForumPage = ['forum', 'forum-topic-detail', 'create-topic'].includes(page);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300">
      <Header 
        onLogoClick={(e) => handleNavigate('home', e)} 
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAuthModal={handleOpenAuthModal}
        enrolledCourses={enrolledCourses}
        onSelectCourse={handleStartLearning}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      
      {!isUserPage && <Sidebar currentPage={page} onNavigate={handleNavigate} />}
      {!isUserPage && !isForumPage && <InfoSidebar onSelectTopic={handleSelectTopic} forumTopics={forumTopics} />}
      
      <div className="flex flex-col min-h-screen">
        <main className={`flex-grow pt-16 ${!isUserPage && !isForumPage ? 'lg:ml-20 xl:mr-80' : 'lg:ml-20'}`}>
          <div className="p-4 md:p-6 lg:p-8 pb-16 lg:pb-8">
              {renderPage()}
          </div>
        </main>
        <Footer onNavigate={handleNavigate} />
      </div>

      <MobileNav currentPage={page} onNavigate={handleNavigate} />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={handleCloseAuthModal}
        onLoginSuccess={handleLoginSuccess}
        initialView={authInitialView}
      />
    </div>
  );
};

export default App;
