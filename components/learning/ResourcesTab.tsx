import React from 'react';
import type { Resource } from '../../types';
import { FaDownload, FaLink } from 'react-icons/fa';

interface ResourcesTabProps {
    resources: Resource[];
}

const ResourcesTab: React.FC<ResourcesTabProps> = ({ resources }) => {
    if (resources.length === 0) {
        return (
            <div className="p-6">
                <p className="text-slate-500 dark:text-slate-400 mt-2 text-center">Bài học này không có tài nguyên đính kèm.</p>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6">
            <ul className="space-y-3">
                {resources.map((resource, index) => (
                    <li key={index}>
                        <a 
                            href={resource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/60 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/80 rounded-lg transition-colors group"
                        >
                            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-slate-200 dark:bg-slate-700 rounded-md text-indigo-500 dark:text-indigo-400">
                                {resource.url.startsWith('#') || resource.url.startsWith('/') ? (
                                    <FaDownload />
                                ) : (
                                    <FaLink />
                                )}
                            </div>
                            <span className="text-slate-700 dark:text-slate-200 font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">{resource.name}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ResourcesTab;
