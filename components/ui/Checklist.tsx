
import React from 'react';
import { FaCheck } from 'react-icons/fa';

interface ChecklistProps {
    items: string[];
    className?: string;
}

const Checklist: React.FC<ChecklistProps> = ({ items, className = '' }) => {
    return (
        <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 ${className}`}>
            {items.map((item, index) => (
                <li key={index} className="flex items-start">
                    <FaCheck className="w-4 h-4 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-600">{item}</span>
                </li>
            ))}
        </ul>
    );
};

export default Checklist;
