
import React, { useState, useMemo } from 'react';
import type { Quiz } from '../../types';
import { FaCheck, FaTimes, FaRedo, FaLightbulb } from 'react-icons/fa';

interface QuizTabProps {
    quiz: Quiz;
}

const QuizTab: React.FC<QuizTabProps> = ({ quiz }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<(number | null)[]>(Array(quiz.questions.length).fill(null));
    const [showResult, setShowResult] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const selectedAnswer = userAnswers[currentQuestionIndex];

    const score = useMemo(() => {
        return userAnswers.reduce((acc, answer, index) => {
            if (answer !== null && answer === quiz.questions[index].correctAnswerIndex) {
                return acc + 1;
            }
            return acc;
        }, 0);
    }, [userAnswers, quiz.questions]);

    const handleAnswerSelect = (optionIndex: number) => {
        if (isAnswered) return;
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = optionIndex;
        setUserAnswers(newAnswers);
    };
    
    const handleCheckAnswer = () => {
        if(selectedAnswer === null) return;
        setIsAnswered(true);
    };

    const handleNextQuestion = () => {
        setIsAnswered(false);
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setShowResult(true);
        }
    };
    
    const handleRetakeQuiz = () => {
        setCurrentQuestionIndex(0);
        setUserAnswers(Array(quiz.questions.length).fill(null));
        setShowResult(false);
        setIsAnswered(false);
    };
    
    const getOptionClass = (optionIndex: number) => {
        if (!isAnswered) {
            return selectedAnswer === optionIndex
                ? 'bg-indigo-100 dark:bg-indigo-900/50 border-indigo-500'
                : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:border-indigo-400 dark:hover:border-indigo-500';
        }
        
        const isCorrect = optionIndex === currentQuestion.correctAnswerIndex;
        const isSelected = optionIndex === selectedAnswer;

        if (isCorrect) return 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-300';
        if (isSelected && !isCorrect) return 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-300';
        
        return 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 opacity-70';
    };


    if (showResult) {
        return (
            <div className="p-6 md:p-8 text-center">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Hoàn thành bài trắc nghiệm!</h3>
                <div className="my-6">
                    <div className="relative inline-flex items-center justify-center w-32 h-32">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                            <path className="stroke-current text-slate-200 dark:text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3.8"></path>
                            <path className="stroke-current text-green-500" strokeDasharray={`${(score / quiz.questions.length) * 100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3.8" strokeLinecap="round" transform="rotate(-90 18 18)"></path>
                        </svg>
                        <span className="absolute text-3xl font-bold text-slate-700 dark:text-slate-200">{score}/{quiz.questions.length}</span>
                    </div>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-300">Bạn đã trả lời đúng {score} trên {quiz.questions.length} câu hỏi.</p>
                <button
                    onClick={handleRetakeQuiz}
                    className="mt-6 flex items-center gap-2 mx-auto px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                    <FaRedo /> Làm lại
                </button>
            </div>
        );
    }
    
    return (
        <div className="p-4 md:p-6">
            <div className="mb-4 flex justify-between items-center">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Câu hỏi {currentQuestionIndex + 1} / {quiz.questions.length}</p>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mb-6">
                <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}></div>
            </div>
            
            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">{currentQuestion.text}</h4>
            
            <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={isAnswered}
                        className={`w-full text-left p-4 rounded-lg border-2 flex items-center gap-4 transition-all duration-200 ${getOptionClass(index)}`}
                    >
                         <div className="w-6 h-6 flex-shrink-0 rounded-full border-2 flex items-center justify-center font-bold text-sm">
                            {isAnswered ? (
                                selectedAnswer === index ? (
                                    index === currentQuestion.correctAnswerIndex ? <FaCheck /> : <FaTimes />
                                ) : (
                                    index === currentQuestion.correctAnswerIndex ? <FaCheck /> : String.fromCharCode(65 + index)
                                )
                            ) : (
                                String.fromCharCode(65 + index)
                            )}
                        </div>
                        <span className="flex-grow">{option}</span>
                    </button>
                ))}
            </div>

            {isAnswered && currentQuestion.explanation && (
                <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-start gap-3">
                    <FaLightbulb className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                        <h5 className="font-bold text-slate-800 dark:text-slate-200">Giải thích</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{currentQuestion.explanation}</p>
                    </div>
                </div>
            )}

            <div className="mt-8 text-right">
                {isAnswered ? (
                     <button
                        onClick={handleNextQuestion}
                        className="px-8 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                    >
                        {currentQuestionIndex === quiz.questions.length - 1 ? 'Xem kết quả' : 'Câu tiếp theo'}
                    </button>
                ) : (
                    <button
                        onClick={handleCheckAnswer}
                        disabled={selectedAnswer === null}
                        className="px-8 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Kiểm tra
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuizTab;
