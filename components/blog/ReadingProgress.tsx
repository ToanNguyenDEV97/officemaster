
import React, { useState, useEffect } from 'react';

const ReadingProgress: React.FC<{ target: React.RefObject<HTMLElement> }> = ({ target }) => {
    const [readingProgress, setReadingProgress] = useState(0);

    const scrollListener = () => {
        if (!target.current) return;

        const element = target.current;
        const totalHeight = element.scrollHeight - window.innerHeight;
        const windowScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        
        const scroll = windowScrollTop - element.offsetTop;

        if (scroll <= 0) {
            return setReadingProgress(0);
        }

        if (scroll > totalHeight) {
            return setReadingProgress(100);
        }

        setReadingProgress((scroll / totalHeight) * 100);
    };

    useEffect(() => {
        window.addEventListener("scroll", scrollListener);
        return () => window.removeEventListener("scroll", scrollListener);
    }, [target]);

    return (
        <div className="fixed top-16 left-0 w-full h-1 z-50 bg-transparent">
            <div style={{ width: `${readingProgress}%` }} className="h-full bg-indigo-600 transition-all duration-100 ease-linear" />
        </div>
    );
};

export default ReadingProgress;
