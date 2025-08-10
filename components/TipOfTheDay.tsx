import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { FaLightbulb, FaSync } from 'react-icons/fa';

const TipOfTheDay: React.FC = () => {
    const [tip, setTip] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchTip = useCallback(async () => {
        setIsLoading(true);
        setError('');
        try {
            if (!process.env.API_KEY) {
                // In a real app, you might not want to throw an error that exposes this.
                // For this environment, we'll set a default tip.
                throw new Error("API key is not set.");
            }
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: "Cung cấp một mẹo hữu ích và ngắn gọn về tin học văn phòng (Excel, Word, hoặc PowerPoint) bằng tiếng Việt. Mẹo nên thực tế, dễ áp dụng và chỉ trong một câu.",
                config: {
                    temperature: 0.8,
                }
            });
            setTip(response.text);
        } catch (err) {
            console.error("Error fetching tip:", err);
            // Set a user-friendly default tip on error
            setTip('Sử dụng phím tắt Ctrl + Shift + L trong Excel để nhanh chóng bật hoặc tắt bộ lọc dữ liệu.'); 
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTip();
    }, [fetchTip]);

    return (
        <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <FaLightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-slate-800 text-base">Mẹo Hay Mỗi Ngày</h3>
                </div>
                <button 
                    onClick={fetchTip} 
                    disabled={isLoading}
                    className="p-1.5 rounded-full hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Tải mẹo mới"
                >
                    <FaSync className={`w-3 h-3 text-slate-500 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
            </div>
            <div className="text-sm text-slate-600 min-h-[40px] flex items-center">
                {isLoading ? (
                    <p className="italic text-slate-400">Đang tải mẹo hay...</p>
                ) : (
                    <p className="italic">"{tip}"</p>
                )}
            </div>
        </div>
    );
};

export default TipOfTheDay;
