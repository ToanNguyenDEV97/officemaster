import React, { forwardRef } from 'react';
import { Lesson } from '../../types';
import { FaPlayCircle } from 'react-icons/fa';

interface VideoPlayerProps {
    lesson: Lesson | null;
    onTimeUpdate: (time: number) => void;
    onEnded: () => void;
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(({ lesson, onTimeUpdate, onEnded }, ref) => {
    
    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        onTimeUpdate(e.currentTarget.currentTime);
    };

    if (!lesson || !lesson.videoUrl) {
        return (
            <div className="aspect-video w-full bg-slate-100 dark:bg-slate-800/50 flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700">
                <FaPlayCircle className="w-16 h-16 mb-4 text-slate-400 dark:text-slate-600" />
                <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">Chọn một bài học để bắt đầu</p>
                <p className="text-sm">Danh sách bài học ở bên phải (hoặc trong menu).</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="aspect-video w-full bg-black rounded-lg overflow-hidden shadow-2xl shadow-indigo-500/10 dark:shadow-indigo-900/30">
                <video
                    ref={ref}
                    key={lesson.id} // Use key to force re-render on lesson change
                    src={lesson.videoUrl}
                    controls
                    autoPlay
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={onEnded}
                    className="w-full h-full"
                >
                    Trình duyệt của bạn không hỗ trợ thẻ video.
                </video>
            </div>
        </div>
    );
});

export default VideoPlayer;
