
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface TourStep {
    selector: string;
    title: string;
    content: string;
    position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
    forDevice?: 'mobile' | 'desktop';
}

const ALL_STEPS: TourStep[] = [
    { 
        selector: '[data-tour-id="progress-header"]', 
        title: 'Theo dõi tiến độ', 
        content: 'Vòng tròn này thể hiện phần trăm khóa học bạn đã hoàn thành, giúp bạn luôn có cái nhìn tổng quan về quá trình học của mình.',
        position: 'bottom',
    },
    { 
        selector: '[data-tour-id="video-player"]', 
        title: 'Nội dung bài học', 
        content: 'Đây là nơi video bài giảng được phát. Bạn có thể sử dụng các điều khiển tiêu chuẩn để tạm dừng, tua, hoặc điều chỉnh âm lượng.',
        position: 'bottom',
    },
    { 
        selector: '[data-tour-id="lesson-nav"]', 
        title: 'Điều hướng bài học', 
        content: 'Sử dụng các nút này để chuyển nhanh đến bài học trước đó hoặc bài học tiếp theo trong danh sách.',
        position: 'bottom',
    },
    { 
        selector: '[data-tour-id="add-note"]', 
        title: 'Thêm ghi chú nhanh', 
        content: 'Nhấn vào đây để thêm một ghi chú mới tại thời điểm hiện tại của video. Giúp bạn dễ dàng xem lại các đoạn quan trọng.',
        position: 'top',
    },
    { 
        selector: '[data-tour-id="autoplay-toggle"]', 
        title: 'Tự động phát', 
        content: 'Khi bật tính năng này, bài học tiếp theo sẽ tự động được phát sau khi bài hiện tại kết thúc.',
        position: 'top',
    },
    { 
        selector: '[data-tour-id="tabs-desktop"]', 
        title: 'Các Tab chức năng', 
        content: 'Chuyển đổi giữa các tab để xem Tổng quan, làm bài Trắc nghiệm hoặc bài Thực hành liên quan đến bài học.',
        position: 'bottom',
        forDevice: 'desktop'
    },
    { 
        selector: '[data-tour-id="playlist-desktop"]', 
        title: 'Danh sách bài học', 
        content: 'Toàn bộ nội dung khóa học được liệt kê ở đây. Bạn có thể chọn bất kỳ bài học nào để bắt đầu.',
        position: 'left',
        forDevice: 'desktop'
    },
    { 
        selector: '[data-tour-id="playlist-toggle"]', 
        title: 'Mở danh sách bài học', 
        content: 'Trên di động, nhấn vào đây để mở danh sách toàn bộ bài học trong khóa học.',
        position: 'bottom',
        forDevice: 'mobile'
    },
];

const TourGuide: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [stepIndex, setStepIndex] = useState(0);
    const [style, setStyle] = useState({});
    const popoverRef = useRef<HTMLDivElement>(null);

    const steps = useMemo(() => {
        const isMobile = window.innerWidth < 640;
        return ALL_STEPS.filter(step => !step.forDevice || (isMobile ? step.forDevice === 'mobile' : step.forDevice === 'desktop'));
    }, []);

    const currentStep = steps[stepIndex];

    const updatePosition = useCallback(() => {
        if (!currentStep) return;
        const element = document.querySelector<HTMLElement>(currentStep.selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

            // Wait for scroll to finish
            setTimeout(() => {
                const rect = element.getBoundingClientRect();
                const popoverRect = popoverRef.current?.getBoundingClientRect();

                let popoverTop = 0;
                let popoverLeft = 0;
                const popoverHeight = popoverRect?.height || 200;
                const popoverWidth = popoverRect?.width || 320;
                const gap = 15;

                switch (currentStep.position) {
                    case 'top':
                        popoverTop = rect.top - popoverHeight - gap;
                        popoverLeft = rect.left + rect.width / 2 - popoverWidth / 2;
                        break;
                    case 'left':
                        popoverLeft = rect.left - popoverWidth - gap;
                        popoverTop = rect.top + rect.height / 2 - popoverHeight / 2;
                        break;
                    case 'right':
                        popoverLeft = rect.right + gap;
                        popoverTop = rect.top + rect.height / 2 - popoverHeight / 2;
                        break;
                    case 'center':
                        popoverLeft = window.innerWidth / 2 - popoverWidth / 2;
                        popoverTop = window.innerHeight / 2 - popoverHeight / 2;
                        break;
                    case 'bottom':
                    default:
                        popoverTop = rect.bottom + gap;
                        popoverLeft = rect.left + rect.width / 2 - popoverWidth / 2;
                        break;
                }
                
                popoverLeft = Math.max(gap, Math.min(popoverLeft, window.innerWidth - popoverWidth - gap));
                popoverTop = Math.max(gap, Math.min(popoverTop, window.innerHeight - popoverHeight - gap));

                setStyle({
                    transform: `translate(${rect.left}px, ${rect.top}px)`,
                    width: `${rect.width}px`,
                    height: `${rect.height}px`,
                    popover: {
                        transform: `translate(${popoverLeft}px, ${popoverTop}px)`,
                    }
                });
                element.style.setProperty("z-index", "1001", "important");
            }, 300); // 300ms for scroll to settle
        } else {
            // If element not found, skip to next step
            handleNext();
        }

    }, [currentStep]);
    
    useEffect(() => {
        const currentElement = document.querySelector<HTMLElement>(currentStep?.selector);
        
        updatePosition();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition);

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'Escape') handleClose();
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition);
            window.removeEventListener('keydown', handleKeyDown);
            if (currentElement) {
                currentElement.style.zIndex = '';
            }
        };
    }, [stepIndex, updatePosition]);

    const handleNext = () => setStepIndex(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    const handlePrev = () => setStepIndex(prev => (prev > 0 ? prev - 1 : prev));
    const handleClose = () => {
         const element = document.querySelector<HTMLElement>(currentStep?.selector);
         if (element) element.style.zIndex = '';
         onClose();
    }

    if (!currentStep) return null;

    return createPortal(
        <div className="fixed inset-0 z-[1000] animate-fade-in">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
             <div 
                className="absolute bg-white transition-all duration-300 ease-in-out pointer-events-none rounded-lg"
                style={{ ...style, zIndex: 1002 }}
            ></div>
            <div
                ref={popoverRef}
                className="absolute z-[1003] bg-white dark:bg-slate-800 rounded-lg shadow-2xl w-80 transition-transform duration-300 ease-in-out"
                style={ (style as any).popover }
            >
                <div className="p-5">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white">{currentStep.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{currentStep.content}</p>
                </div>
                <div className="px-5 py-3 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center rounded-b-lg">
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{stepIndex + 1} / {steps.length}</span>
                    <div className="flex items-center gap-2">
                        {stepIndex > 0 && <button onClick={handlePrev} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600"><FaArrowLeft className="w-3 h-3"/> Trước</button>}
                        {stepIndex < steps.length - 1 ? (
                            <button onClick={handleNext} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Tiếp <FaArrowRight className="w-3 h-3"/></button>
                        ) : (
                            <button onClick={handleClose} className="px-3 py-1.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">Hoàn thành</button>
                        )}
                    </div>
                </div>
            </div>
             <button onClick={handleClose} className="absolute top-4 right-4 p-2 text-white/70 hover:text-white rounded-full bg-black/20 hover:bg-black/40 z-[1004]" aria-label="Đóng hướng dẫn"><FaTimes className="w-6 h-6"/></button>
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out forwards;
                }
             `}</style>
        </div>,
        document.body
    );
};

export default TourGuide;
