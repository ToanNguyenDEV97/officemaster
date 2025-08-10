
import React from 'react';

interface PageHeaderProps {
    title: string;
    description: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
    return (
        <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">{title}</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl">{description}</p>
        </div>
    );
};

export default PageHeader;