
import React from 'react';
import { Heading } from '../../types';

interface TableOfContentsProps {
    headings: Heading[];
    activeId: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ headings, activeId }) => {
    if (headings.length === 0) return null;

    return (
        <div className="p-4 bg-slate-100/80 backdrop-blur-sm rounded-lg border border-slate-200 max-h-[calc(100vh-12rem)] overflow-y-auto">
            <h3 className="font-bold text-slate-800 mb-3">Mục lục</h3>
            <nav>
                <ul className="space-y-2">
                    {headings.map(heading => (
                        <li key={heading.id}>
                            <a
                                href={`#${heading.id}`}
                                className={`block text-sm transition-all duration-200 border-l-2 ${
                                    heading.level === 3 ? 'ml-4' : ''
                                } ${
                                    activeId === heading.id 
                                    ? 'text-indigo-600 font-semibold border-indigo-600 pl-3' 
                                    : 'text-slate-600 hover:text-slate-900 border-transparent hover:border-slate-400 pl-3'
                                }`}
                            >
                                {heading.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default TableOfContents;
