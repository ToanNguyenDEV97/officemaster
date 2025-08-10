
import React, { useState } from 'react';
import type { Exercise } from '../../types';
import { FaDownload, FaLightbulb } from 'react-icons/fa';

interface ExerciseTabProps {
    exercise: Exercise;
}

const ExerciseTab: React.FC<ExerciseTabProps> = ({ exercise }) => {
    const [showSolution, setShowSolution] = useState(false);

    return (
        <div className="p-4 md:p-6 space-y-6">
            <div>
                <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100">{exercise.title}</h4>
                <p className="mt-2 text-slate-600 dark:text-slate-300 whitespace-pre-line">{exercise.description}</p>
            </div>

            {exercise.starterFileUrl && (
                <a
                    href={exercise.starterFileUrl}
                    download
                    className="inline-flex items-center gap-3 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                    <FaDownload />
                    Tải file bài tập
                </a>
            )}

            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                {!showSolution ? (
                    <button
                        onClick={() => setShowSolution(true)}
                        className="flex items-center gap-3 px-5 py-2.5 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                        <FaLightbulb />
                        Xem lời giải
                    </button>
                ) : (
                    <div className="space-y-4 animate-fade-in">
                        <h5 className="text-lg font-bold text-slate-800 dark:text-slate-100">Lời giải chi tiết</h5>
                        {exercise.solutionVideoUrl && (
                            <div>
                                <div className="aspect-video w-full bg-black rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                                    <video
                                        key={exercise.id}
                                        src={exercise.solutionVideoUrl}
                                        controls
                                        className="w-full h-full"
                                    >
                                        Trình duyệt của bạn không hỗ trợ thẻ video.
                                    </video>
                                </div>
                            </div>
                        )}
                        {exercise.solutionFileUrl && (
                            <a
                                href={exercise.solutionFileUrl}
                                download
                                className="inline-flex items-center gap-3 px-5 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                            >
                                <FaDownload />
                                Tải file lời giải
                            </a>
                        )}
                    </div>
                )}
            </div>
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out forwards;
                }
             `}</style>
        </div>
    );
};

export default ExerciseTab;
