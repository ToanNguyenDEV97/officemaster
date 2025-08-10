

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import type { Course, Lesson, TimestampedNote } from '../types';
import VideoPlayer from '../components/learning/VideoPlayer';
import CoursePlaylist from '../components/learning/CoursePlaylist';
import NotesTab from '../components/learning/NotesTab';
import ResourcesTab from '../components/learning/ResourcesTab';
import QuizTab from '../components/learning/QuizTab';
import ExerciseTab from '../components/learning/ExerciseTab';
import TourGuide from '../components/learning/TourGuide';
import { 
    FaChevronLeft, FaListUl, FaTimes, FaFileDownload, 
    FaSun, FaMoon, FaPlus, FaBookOpen, FaRegStickyNote,
    FaPlayCircle, FaQuestionCircle, FaClipboardCheck, FaKeyboard
} from 'react-icons/fa';

interface LearningPageProps {
    course: Course;
    onNavigate: (pageId: string) => void;
    theme: string;
    toggleTheme: () => void;
}

type Tab = 'overview' | 'notes' | 'resources' | 'quiz' | 'exercise';

const findFirstLesson = (c: Course): Lesson | null => c.modules?.[0]?.lessons?.[0] || null;

const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '00:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const LearningPage: React.FC<LearningPageProps> = ({ course, onNavigate, theme, toggleTheme }) => {
    // === STATE MANAGEMENT ===
    const [courseData, setCourseData] = useState<Course>(course);
    const [activeLesson, setActiveLesson] = useState<Lesson | null>(() => findFirstLesson(course));
    const [activeTab, setActiveTab] = useState<Tab>('overview');
    const [isPlaylistOpen, setPlaylistOpen] = useState(false);
    const [notes, setNotes] = useState<TimestampedNote[]>([]);
    const [videoCurrentTime, setVideoCurrentTime] = useState(0);
    const [isAutoplayEnabled, setAutoplayEnabled] = useState(true);
    const [isTourOpen, setIsTourOpen] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);

    // === MEMOIZED VALUES & DERIVED STATE ===
    const allLessons = useMemo(() => courseData.modules?.flatMap(m => m.lessons) || [], [courseData]);
    
    const currentLessonIndex = useMemo(() => {
        if (!activeLesson) return -1;
        return allLessons.findIndex(l => l.id === activeLesson.id);
    }, [activeLesson, allLessons]);

    const prevLesson = useMemo(() => currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null, [currentLessonIndex, allLessons]);
    const nextLesson = useMemo(() => currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null, [currentLessonIndex, allLessons]);
    
    const totalLessons = allLessons.length;
    const completedLessonsCount = useMemo(() => allLessons.filter(l => l.isCompleted).length, [allLessons]);
    const courseProgress = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;

    // === EFFECTS ===
    useEffect(() => {
        setCourseData(course);
        const firstLesson = findFirstLesson(course);
        setActiveLesson(firstLesson);
    }, [course]);

    useEffect(() => {
        if (activeLesson) {
            try {
                const savedNotes = localStorage.getItem(`notes_${activeLesson.id}`);
                setNotes(savedNotes ? JSON.parse(savedNotes) : []);
            } catch (error) {
                console.error("Failed to parse notes from localStorage", error);
                setNotes([]);
            }
        } else {
            setNotes([]);
        }
        setVideoCurrentTime(0);
        setActiveTab('overview');
    }, [activeLesson]);

    useEffect(() => {
        if (activeLesson) {
            localStorage.setItem(`notes_${activeLesson.id}`, JSON.stringify(notes));
        }
    }, [notes, activeLesson]);

    // === HANDLERS & HELPERS ===
    const handleSelectLesson = useCallback((lesson: Lesson) => {
        setActiveLesson(lesson);
        setPlaylistOpen(false);
    }, []);

    const handleNextLesson = useCallback(() => {
        if (nextLesson) {
            handleSelectLesson(nextLesson);
        }
    }, [nextLesson, handleSelectLesson]);
    
    const handlePrevLesson = useCallback(() => {
        if (prevLesson) {
            handleSelectLesson(prevLesson);
        }
    }, [prevLesson, handleSelectLesson]);

    const handleToggleComplete = useCallback((lessonId: string) => {
        const newModules = courseData.modules?.map(module => ({
            ...module,
            lessons: module.lessons.map(lesson =>
                lesson.id === lessonId ? { ...lesson, isCompleted: !lesson.isCompleted } : lesson
            )
        }));
        if (newModules) {
            setCourseData(prev => ({ ...prev, modules: newModules }));
        }
    }, [courseData.modules]);

    const handleAddNote = useCallback(() => {
        if (!activeLesson) return;
        setActiveTab('notes');
        const newNote: TimestampedNote = {
            id: String(Date.now()),
            time: videoCurrentTime,
            content: ''
        };
        setNotes(prev => [...prev, newNote].sort((a,b) => a.time - b.time));
    }, [videoCurrentTime, activeLesson]);
    
    const handleUpdateNoteContent = useCallback((noteId: string, content: string) => {
        setNotes(prev => prev.map(n => n.id === noteId ? { ...n, content } : n));
    }, []);

    const handleDeleteNote = useCallback((noteId: string) => {
        setNotes(prev => prev.filter(n => n.id !== noteId));
    }, []);

    const handleSeekToTime = useCallback((time: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = time;
            videoRef.current.play();
        }
    }, []);

    const handleVideoEnded = useCallback(() => {
        if (isAutoplayEnabled) {
            if(activeLesson) handleToggleComplete(activeLesson.id);
            handleNextLesson();
        }
    }, [isAutoplayEnabled, activeLesson, handleToggleComplete, handleNextLesson]);


    // === RENDER LOGIC ===
    const SecondaryButton: React.FC<{onClick: () => void, isActive: boolean, disabled?: boolean, children: React.ReactNode}> = ({ onClick, isActive, disabled, children }) => (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                isActive 
                ? 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
        >
            {children}
        </button>
    );

    const renderTabContent = () => {
        if (!activeLesson) {
             return (
                <div className="p-6 text-center text-slate-500 dark:text-slate-400">
                    <FaPlayCircle className="mx-auto w-12 h-12 text-slate-400 dark:text-slate-600 mb-4" />
                    <h3 className="font-semibold text-slate-700 dark:text-slate-300">Chào mừng bạn!</h3>
                    <p>Hãy chọn một bài học để bắt đầu hành trình.</p>
                </div>
            );
        }

        switch (activeTab) {
            case 'notes':
                return <NotesTab notes={notes} onUpdateNote={handleUpdateNoteContent} onDeleteNote={handleDeleteNote} onSeekToTime={handleSeekToTime} formatTime={formatTime} />;
            case 'resources':
                return <ResourcesTab resources={activeLesson.resources || []} />;
            case 'quiz':
                return activeLesson.quiz ? <QuizTab quiz={activeLesson.quiz} /> : null;
            case 'exercise':
                return activeLesson.exercise ? <ExerciseTab exercise={activeLesson.exercise} /> : null;
            case 'overview':
            default:
                return (
                     <div className="p-6 prose dark:prose-invert prose-slate max-w-none text-slate-600 dark:text-slate-300">
                        <p>{activeLesson.description || "Chưa có mô tả cho bài học này."}</p>
                    </div>
                );
        }
    };
    
    const TabButton: React.FC<{id: Tab, label: string, icon: React.ReactNode, disabled?: boolean}> = ({ id, label, icon, disabled = false }) => (
        <button
            onClick={() => !disabled && setActiveTab(id)}
            disabled={disabled}
            className={`${activeTab === id ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-300' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-500'} flex items-center gap-2 whitespace-nowrap py-3 px-2 border-b-2 font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
        >
            {icon} {label}
        </button>
    );

    return (
        <div className="font-sans">
            <div className="fixed inset-0 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 flex flex-col">
                {/* Header */}
                 <header className="flex-shrink-0 bg-white dark:bg-slate-900 h-16 flex items-center justify-between px-4 z-20 border-b border-slate-200 dark:border-slate-800">
                    {/* Left side: Back button and Course Title */}
                    <div className="flex items-center gap-2 sm:gap-4 overflow-hidden flex-1">
                        <button onClick={() => onNavigate('my-courses')} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex-shrink-0 transition-colors" aria-label="Trở về danh sách khóa học">
                            <FaChevronLeft />
                        </button>
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate" title={courseData.title}>{courseData.title}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">bởi {courseData.instructorName}</p>
                        </div>
                    </div>

                    {/* Right side: Progress and Actions */}
                    <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                        {/* Progress Tracker */}
                        <div className="hidden sm:flex items-center gap-3" data-tour-id="progress-header">
                            <div className="w-10 h-10 flex-shrink-0 relative">
                                <svg className="w-full h-full" viewBox="0 0 36 36">
                                    <path className="stroke-current text-slate-200 dark:text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3.8"></path>
                                    <path className="stroke-current text-orange-500" strokeDasharray={`${courseProgress}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3.8" strokeLinecap="round" transform="rotate(-90 18 18)"></path>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="font-bold text-xs text-slate-700 dark:text-slate-200">{`${courseProgress}%`}</span>
                                </div>
                            </div>
                            <div className="text-slate-700 dark:text-slate-200 text-sm font-semibold whitespace-nowrap">
                                <span>{`${completedLessonsCount}/${totalLessons} bài học`}</span>
                            </div>
                        </div>

                        {/* Separator */}
                        <div className="hidden sm:block w-px h-8 bg-slate-200 dark:bg-slate-700"></div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-0 sm:gap-1">
                            <button onClick={toggleTheme} className="p-2.5 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Chuyển chế độ sáng/tối">
                                {theme === 'light' ? <FaMoon className="w-5 h-5" /> : <FaSun className="w-5 h-5" />}
                            </button>
                             <button onClick={() => setIsTourOpen(true)} className="p-2.5 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Bắt đầu hướng dẫn">
                                <FaQuestionCircle className="w-5 h-5" />
                            </button>
                            <button onClick={() => setPlaylistOpen(true)} className="p-2.5 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors sm:hidden" aria-label="Hiện danh sách bài học" data-tour-id="playlist-toggle">
                                <FaListUl className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </header>
                
                <div className="flex-grow flex sm:grid sm:grid-cols-12 sm:gap-0 h-[calc(100vh-4rem)] relative">
                    {/* Main Content */}
                    <main className="flex-grow flex flex-col h-full overflow-y-auto bg-slate-50 dark:bg-slate-950 sm:col-span-7 lg:col-span-8 xl:col-span-9">
                        <div className="p-0.5 sm:p-1 md:p-2 lg:p-4" data-tour-id="video-player">
                             <VideoPlayer ref={videoRef} lesson={activeLesson} onTimeUpdate={(time) => setVideoCurrentTime(time)} onEnded={handleVideoEnded} />
                        </div>

                        {/* Lesson Action Bar */}
                        <div className="px-4 py-3 border-b border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex-shrink-0">
                             <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                                <h2 className="text-xl lg:text-2xl font-bold text-slate-800 dark:text-slate-100 line-clamp-2" title={activeLesson?.title}>{activeLesson?.title || 'Chưa chọn bài học'}</h2>
                                <div className="flex items-center gap-2 flex-shrink-0" data-tour-id="lesson-nav">
                                    <button 
                                        onClick={handlePrevLesson} 
                                        disabled={!prevLesson} 
                                        className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Bài trước
                                    </button>
                                    <button 
                                        onClick={handleNextLesson} 
                                        disabled={!nextLesson} 
                                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Bài tiếp theo
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mt-3">
                                 <div className="flex items-center gap-2 flex-wrap">
                                    <button onClick={handleAddNote} disabled={!activeLesson} className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300 rounded-lg font-semibold text-sm hover:bg-indigo-100 dark:hover:bg-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" data-tour-id="add-note">
                                        <FaPlus /> Thêm ghi chú tại {formatTime(videoCurrentTime)}
                                    </button>
                                     <SecondaryButton 
                                        onClick={() => setActiveTab('notes')}
                                        isActive={activeTab === 'notes'}
                                        disabled={!activeLesson}
                                    >
                                        <FaRegStickyNote /> Ghi chú của bạn
                                    </SecondaryButton>
                                    <SecondaryButton 
                                        onClick={() => setActiveTab('resources')}
                                        isActive={activeTab === 'resources'}
                                        disabled={!activeLesson?.resources || activeLesson.resources.length === 0}
                                    >
                                        <FaFileDownload /> Tài nguyên
                                    </SecondaryButton>
                                </div>
                                
                                <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-600 dark:text-slate-400" data-tour-id="autoplay-toggle">
                                    <span className="font-medium">Tự động phát</span>
                                    <input type="checkbox" checked={isAutoplayEnabled} onChange={() => setAutoplayEnabled(p => !p)} className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                </label>
                            </div>
                        </div>

                        {/* Mobile & Tablet Tabs */}
                        <div className="sm:hidden bg-white dark:bg-slate-900">
                            <div className="border-b border-slate-200 dark:border-slate-800 px-4">
                               <nav className="-mb-px flex space-x-2 overflow-x-auto" data-tour-id="tabs">
                                    <TabButton id="overview" label="Tổng quan" icon={<FaBookOpen />} />
                                    <TabButton id="quiz" label="Trắc nghiệm" icon={<FaClipboardCheck />} disabled={!activeLesson?.quiz} />
                                    <TabButton id="exercise" label="Thực hành" icon={<FaKeyboard />} disabled={!activeLesson?.exercise} />
                                </nav>
                            </div>
                            {renderTabContent()}
                        </div>
                    </main>

                    {/* Right Sidebar */}
                    <aside className="hidden sm:flex flex-col sm:col-span-5 lg:col-span-4 xl:col-span-3 h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800" data-tour-id="playlist-desktop">
                        <div className="flex-shrink-0 border-b border-slate-200 dark:border-slate-800">
                            <div className="p-4">
                                <h2 className="font-bold text-lg">Nội dung khóa học</h2>
                            </div>
                             <div className="border-b border-slate-200 dark:border-slate-800 px-4">
                               <nav className="-mb-px flex space-x-2 sm:space-x-4" data-tour-id="tabs-desktop">
                                    <TabButton id="overview" label="Tổng quan" icon={<FaBookOpen />} />
                                    <TabButton id="quiz" label="Trắc nghiệm" icon={<FaClipboardCheck />} disabled={!activeLesson?.quiz} />
                                    <TabButton id="exercise" label="Thực hành" icon={<FaKeyboard />} disabled={!activeLesson?.exercise} />
                                </nav>
                            </div>
                        </div>
                        <div className="flex-grow overflow-y-auto">
                           {renderTabContent()}
                        </div>
                        <div className="flex-shrink-0 max-h-[50vh] overflow-y-auto border-t border-slate-200 dark:border-slate-800">
                            <CoursePlaylist modules={courseData.modules || []} activeLessonId={activeLesson?.id || null} onSelectLesson={handleSelectLesson} onToggleComplete={handleToggleComplete} />
                        </div>
                    </aside>
                </div>

                {/* Mobile Playlist Drawer */}
                {isPlaylistOpen && (
                    <div className="fixed inset-0 z-30 bg-black/60 sm:hidden" onClick={() => setPlaylistOpen(false)}>
                        <aside 
                            className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white dark:bg-slate-900 flex flex-col shadow-2xl animate-slide-in-right"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex-shrink-0 flex items-center justify-between">
                                <h2 className="font-bold text-lg">Nội dung khóa học</h2>
                                <button onClick={() => setPlaylistOpen(false)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 -mr-2" aria-label="Đóng danh sách bài học">
                                    <FaTimes />
                                </button>
                            </div>
                            <div className="overflow-y-auto">
                                <CoursePlaylist modules={courseData.modules || []} activeLessonId={activeLesson?.id || null} onSelectLesson={handleSelectLesson} onToggleComplete={handleToggleComplete} />
                            </div>
                        </aside>
                    </div>
                )}
            </div>
            {isTourOpen && <TourGuide onClose={() => setIsTourOpen(false)} />}
             <style>{`
                @keyframes slide-in-right {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                .animate-slide-in-right {
                    animation: slide-in-right 0.3s cubic-bezier(0.25, 1, 0.5, 1) forwards;
                }
            `}</style>
        </div>
    );
};

export default LearningPage;