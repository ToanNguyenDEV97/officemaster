
import React from 'react';

interface SocialButtonProps {
    provider: 'Google' | 'Facebook' | 'Github';
    icon: React.ReactNode;
    onClick?: () => void;
}

const SocialButton: React.FC<SocialButtonProps> = ({ provider, icon, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full flex items-center justify-center py-2.5 px-4 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
            <span className="mr-3">{icon}</span>
            Tiếp tục với {provider}
        </button>
    );
};

export default SocialButton;