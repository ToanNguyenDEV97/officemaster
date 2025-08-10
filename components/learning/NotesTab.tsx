

import React, { useRef, useEffect } from 'react';
import type { TimestampedNote } from '../../types';
import { FaTrash, FaPlay, FaRegLightbulb } from 'react-icons/fa';

interface NotesTabProps {
    notes: TimestampedNote[];
    onUpdateNote: (noteId: string, content: string) => void;
    onDeleteNote: (noteId: string) => void;
    onSeekToTime: (time: number) => void;
    formatTime: (timeInSeconds: number) => string;
}

const NotesTab: React.FC<NotesTabProps> = ({ notes, onUpdateNote, onDeleteNote, onSeekToTime, formatTime }) => {
    const newNoteRef = useRef<HTMLTextAreaElement>(null);

    // Auto-focus the new note textarea
    useEffect(() => {
        if (newNoteRef.current) {
            newNoteRef.current.focus();
        }
    }, [notes.length]);
    
    const handleTextareaInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const textarea = e.currentTarget;
        textarea.style.height = 'auto'; // Reset height
        textarea.style.height = `${textarea.scrollHeight}px`; // Set to content height
    };

    return (
        <div className="p-4 md:p-6">
            {notes.length === 0 ? (
                <div className="text-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <FaRegLightbulb className="mx-auto w-10 h-10 text-yellow-400 dark:text-yellow-300 mb-3" />
                    <h3 className="font-semibold text-slate-700 dark:text-slate-200">Ghi chú hiệu quả</h3>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
                        Nhấn nút "Thêm ghi chú" trong lúc xem video để lưu lại những điểm quan trọng theo đúng mốc thời gian.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {notes.map(note => (
                        <div key={note.id} className="flex items-start gap-4 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                            <button
                                onClick={() => onSeekToTime(note.time)}
                                className="flex-shrink-0 mt-1.5 flex items-center gap-1.5 px-2 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-md text-xs font-bold hover:bg-indigo-200 dark:hover:bg-indigo-900"
                            >
                                <FaPlay className="w-2.5 h-2.5"/>
                                {formatTime(note.time)}
                            </button>
                            <textarea
                                ref={note.content === '' ? newNoteRef : null}
                                value={note.content}
                                onChange={e => onUpdateNote(note.id, e.target.value)}
                                onInput={handleTextareaInput}
                                placeholder="Viết ghi chú của bạn ở đây..."
                                className="w-full bg-transparent p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none overflow-hidden text-sm text-slate-700 dark:text-slate-200"
                                rows={1}
                            />
                            <button
                                onClick={() => onDeleteNote(note.id)}
                                className="mt-1.5 p-2 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 rounded-full"
                            >
                                <FaTrash className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotesTab;
